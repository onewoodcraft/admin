import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
// internal
import { convertINRtoUSD, convertUSDtoINR } from '@/utils/price-formatter';
import ErrorMessage from '../error-message/error';

const ProductForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm();

  // Handle price change
  const handlePriceChange = (e) => {
    const priceINR = parseFloat(e.target.value);
    if (!isNaN(priceINR)) {
      const priceUSD = convertINRtoUSD(priceINR);
      setValue('price', priceUSD.toFixed(2));
      setValue('priceINR', priceINR);
    }
  };

  // Handle USD price change
  const handleUSDPriceChange = (e) => {
    const priceUSD = parseFloat(e.target.value);
    if (!isNaN(priceUSD)) {
      const priceINR = convertUSDtoINR(priceUSD);
      setValue('priceINR', priceINR.toFixed(2));
      setValue('price', priceUSD);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {/* Title */}
        <div className="sm:col-span-4">
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
            Title
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.title && <ErrorMessage message={errors.title.message} />}
          </div>
        </div>

        {/* Price INR */}
        <div className="sm:col-span-2">
          <label htmlFor="priceINR" className="block text-sm font-medium leading-6 text-gray-900">
            Price (INR)
          </label>
          <div className="mt-2">
            <input
              type="number"
              step="0.01"
              {...register('priceINR', { 
                required: 'Price in INR is required',
                min: { value: 0, message: 'Price must be positive' }
              })}
              onChange={handlePriceChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.priceINR && <ErrorMessage message={errors.priceINR.message} />}
          </div>
        </div>

        {/* Price USD */}
        <div className="sm:col-span-2">
          <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
            Price (USD)
          </label>
          <div className="mt-2">
            <input
              type="number"
              step="0.01"
              {...register('price', { 
                required: 'Price in USD is required',
                min: { value: 0, message: 'Price must be positive' }
              })}
              onChange={handleUSDPriceChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.price && <ErrorMessage message={errors.price.message} />}
          </div>
        </div>

        {/* Other form fields... */}
        
        <div className="sm:col-span-6">
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm; 