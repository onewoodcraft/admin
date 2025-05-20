import React, { useState } from 'react';
import { Button, Card, message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import * as XLSX from 'xlsx';
import axios from 'axios';

const { Dragger } = Upload;

const BulkUpload: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File) => {
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Transform data to match your product schema
        const products = (jsonData || []).map((item: any) => ({
          name: item.name,
          description: item.description,
          price: parseFloat(item.price),
          comparePrice: parseFloat(item.comparePrice) || 0,
          category: item.category,
          type: 'onewoodcraft',
          images: item.images ? item.images.split(',').map((url: string) => url.trim()) : [],
          stock: parseInt(item.stock) || 0,
          sku: item.sku,
          status: item.status || 'active',
          featured: item.featured === 'true',
          specifications: item.specifications ? JSON.parse(item.specifications) : {},
        }));

        // Send to your API
        const response = await axios.post('/api/products/bulk', { products });
        
        if (response.data.success) {
          message.success(`Successfully uploaded ${(products?.length || 0)} products`);
        } else {
          message.error('Failed to upload products');
        }
      };
      reader.readAsBinaryString(file);
    } catch (error) {
      message.error('Error processing file');
      console.error(error);
    } finally {
      setLoading(false);
    }
    return false;
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    accept: '.xlsx,.xls,.csv',
    beforeUpload: handleUpload,
    showUploadList: false,
  };

  return (
    <Card title="Bulk Product Upload" className="mb-4">
      <div className="mb-4">
        <h4>Instructions:</h4>
        <ol>
          <li>Download the template file</li>
          <li>Fill in your product details</li>
          <li>Upload the completed file</li>
        </ol>
        <Button 
          type="primary" 
          onClick={() => window.open('/templates/product-upload-template.xlsx')}
          className="mb-4"
        >
          Download Template
        </Button>
      </div>
      
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for .xlsx, .xls, or .csv files
        </p>
      </Dragger>
    </Card>
  );
};

export default BulkUpload; 