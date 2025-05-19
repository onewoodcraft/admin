"use client";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { useForm } from "react-hook-form";
import {useRouter} from 'next/navigation';
import { useAddProductMutation, useEditProductMutation } from "@/redux/product/productApi";
import { notifyError, notifySuccess } from "@/utils/toast";

// ImageURL type
export interface ImageURL {
  color: {
    name?: string;
    clrCode?: string;
  };
  img: string;
  sizes?: string[];
}
type IBrand = {
  name: string;
  id: string;
};
type ICategory = {
  name: string;
  id: string;
};

type status = "in-stock" | "out-of-stock" | "discontinued";

const useProductSubmit = () => {
  const [sku, setSku] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [imageURLs, setImageURLs] = useState<ImageURL[]>([]);
  const [parent, setParent] = useState<string>("");
  const [children, setChildren] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [brand, setBrand] = useState<IBrand>({ name: "", id: "" });
  const [category, setCategory] = useState<ICategory>({ name: "", id: "" });
  const [status, setStatus] = useState<status>("in-stock");
  const [productType, setProductType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [videoId, setVideoId] = useState<string>("");
  const [offerDate, setOfferDate] = useState<{
    startDate: null;
    endDate: null;
  }>({
    startDate: null,
    endDate: null,
  });
  const [additionalInformation, setAdditionalInformation] = useState<
    {
      key: string;
      value: string;
    }[]
  >([]);
  const [tags, setTags] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const router = useRouter();


  // useAddProductMutation
  const [addProduct, { data: addProductData, isError, isLoading }] =
    useAddProductMutation();
  // useAddProductMutation
  const [editProduct, { data: editProductData, isError: editErr, isLoading: editLoading }] =
    useEditProductMutation();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();
  // resetForm
  const resetForm = () => {
    setSku("");
    setImg("");
    setTitle("");
    setSlug("");
    setUnit("");
    setImageURLs([]);
    setParent("");
    setChildren("");
    setPrice(0);
    setDiscount(0);
    setQuantity(0);
    setBrand({ name: "", id: "" });
    setCategory({ name: "", id: "" });
    setStatus("in-stock");
    setProductType("");
    setDescription("");
    setVideoId("");
    setOfferDate({
      startDate: null,
      endDate: null,
    });
    setAdditionalInformation([]);
    setTags([]);
    setSizes([]);
    reset();
  };

  // handle submit product
  const handleSubmitProduct = async (data: any) => {
    // Create an array to collect validation errors
    const validationErrors: string[] = [];

    // Validate required fields with specific messages
    if (!img) {
      validationErrors.push("Main product image is required");
    }
    if (!category.name) {
      validationErrors.push("Category is required");
    }
    if (!brand.name || !brand.id) {
      validationErrors.push("Brand is required");
    }
    if (!productType) {
      validationErrors.push("Product type is required");
    }
    if (!data.title?.trim()) {
      validationErrors.push("Product title is required");
    }
    if (!data.SKU?.trim()) {
      validationErrors.push("SKU is required");
    }
    if (!data.unit?.trim()) {
      validationErrors.push("Unit is required");
    }
    if (!data.description?.trim()) {
      validationErrors.push("Product description is required");
    }

    // Convert and validate numeric fields
    const price = Number(data.price);
    const discount = Number(data.discount_percentage) || 0;
    const quantity = Number(data.quantity);

    if (isNaN(price) || price <= 0) {
      validationErrors.push("Price must be a positive number");
    }
    if (isNaN(discount) || discount < 0) {
      validationErrors.push("Discount must be a non-negative number");
    }
    if (discount > price) {
      validationErrors.push("Product price must be greater than discount");
    }
    if (isNaN(quantity) || quantity < 0) {
      validationErrors.push("Quantity must be a non-negative number");
    }

    // If there are validation errors, throw them to be caught by the form component
    if (validationErrors.length > 0) {
      console.error("Validation errors:", validationErrors);
      throw new Error(validationErrors.join("\n"));
    }

    // If no variations are added, use the main product image as a variation
    let finalImageURLs = [...imageURLs];
    if (finalImageURLs.length === 0 && img) {
      finalImageURLs = [{
        color: { name: "Default", clrCode: "#000000" },
        img: img,
        sizes: []
      }];
    }

    // product data
    const productData = {
      sku: data.SKU,
      img: img,
      title: data.title,
      slug: slugify(data.title, { replacement: "-", lower: true }),
      unit: data.unit,
      imageURLs: finalImageURLs,
      parent: parent,
      children: children,
      price: price,
      discount: discount,
      quantity: quantity,
      brand: brand,
      category: category,
      status: status,
      offerDate: {
        startDate: offerDate.startDate,
        endDate: offerDate.endDate,
      },
      productType: productType,
      description: data.description,
      videoId: data.youtube_video_Id || "",
      additionalInformation: additionalInformation,
      tags: tags,
    };

    // Add detailed logging
    console.log('Product Data being sent to server:', JSON.stringify(productData, null, 2));
    console.log('Validation state:', {
      hasMainImage: !!img,
      hasCategory: !!category.name,
      hasBrand: !!(brand.name && brand.id),
      hasProductType: !!productType,
      hasTitle: !!data.title?.trim(),
      hasSKU: !!data.SKU?.trim(),
      hasUnit: !!data.unit?.trim(),
      hasDescription: !!data.description?.trim(),
      price: price,
      discount: discount,
      quantity: quantity,
      imageURLsLength: finalImageURLs.length,
      additionalInformationLength: additionalInformation.length
    });

    try {
      const res = await addProduct(productData);
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string; errors?: any[]; error?: string };
          console.error("Server error response details:", {
            status: res.error.status,
            data: errorData,
            originalError: res.error
          });
          
          // Handle different types of server error responses
          if (errorData.errors && Array.isArray(errorData.errors)) {
            // Handle array of validation errors
            const serverErrors = errorData.errors.map(err => err.msg || err.message || err).join("\n");
            console.error("Server validation errors:", errorData.errors);
            throw new Error(serverErrors);
          } else if (errorData.error) {
            // Handle single error message
            console.error("Server error message:", errorData.error);
            throw new Error(errorData.error);
          } else if (typeof errorData.message === "string") {
            // Handle message field
            console.error("Server message:", errorData.message);
            throw new Error(errorData.message);
          } else {
            // Handle unknown error format
            console.error("Unknown error format:", errorData);
            throw new Error("Server validation failed. Please check your input and try again.");
          }
        } else {
          // Handle error without data
          console.error("Error without data:", res.error);
          throw new Error("Failed to add product. Please try again.");
        }
      } else {
        console.log('Product added successfully:', res);
        notifySuccess("Product created successfully");
        setIsSubmitted(true);
        resetForm();
        router.push('/product-grid');
      }
    } catch (error: any) {
      console.error("Error adding product:", error);
      // If it's already an Error object with a message, rethrow it
      if (error instanceof Error) {
        throw error;
      }
      // If it's a string or other format, wrap it in an Error
      throw new Error(typeof error === 'string' ? error : "Failed to add product. Please try again.");
    }
  };
  // handle edit product
  const handleEditProduct = async (data: any, id: string) => {
    // product data
    const productData = {
      sku: data.SKU,
      img: img,
      title: data.title,
      slug: slugify(data.title, { replacement: "-", lower: true }),
      unit: data.unit,
      imageURLs: imageURLs,
      parent: parent,
      children: children,
      price: data.price,
      discount: data.discount_percentage,
      quantity: data.quantity,
      brand: brand,
      category: category,
      status: status,
      offerDate: {
        startDate: offerDate.startDate,
        endDate: offerDate.endDate,
      },
      productType: productType,
      description: data.description,
      videoId: data.youtube_video_Id,
      additionalInformation: additionalInformation,
      tags: tags,
    };
    console.log('edit productData---->',productData)
    const res = await editProduct({ id: id, data: productData });
    if ("error" in res) {
      if ("data" in res.error) {
        const errorData = res.error.data as { message?: string };
        if (typeof errorData.message === "string") {
          return notifyError(errorData.message);
        }
      }
    } else {
      notifySuccess("Product edit successFully");
      setIsSubmitted(true);
      router.push('/product-grid')
      resetForm();
    }
  };

  return {
    sku,
    setSku,
    img,
    setImg,
    title,
    setTitle,
    slug,
    setSlug,
    unit,
    setUnit,
    imageURLs,
    setImageURLs,
    parent,
    setParent,
    children,
    setChildren,
    price,
    setPrice,
    discount,
    setDiscount,
    quantity,
    setQuantity,
    brand,
    setBrand,
    category,
    setCategory,
    status,
    setStatus,
    productType,
    setProductType,
    description,
    setDescription,
    videoId,
    setVideoId,
    additionalInformation,
    setAdditionalInformation,
    tags,
    setTags,
    sizes,
    setSizes,
    handleSubmitProduct,
    handleEditProduct,
    register,
    handleSubmit,
    errors,
    control,
    offerDate,
    setOfferDate,
    setIsSubmitted,
    isSubmitted,
  };
};

export default useProductSubmit;
