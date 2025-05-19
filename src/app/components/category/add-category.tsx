"use client";
import React, { useState } from "react";
import useCategorySubmit from "@/hooks/useCategorySubmit";
import ProductType from "../products/add-product/product-type";
import GiftingType from "../products/add-product/gifting-type";
import CategoryTables from "./category-tables";
import CategoryImgUpload from "./global-img-upload";
import CategoryChildren from "./category-children";
import CategoryParent from "./category-parent";
import CategoryDescription from "./category-description";

const AddCategory = () => {
  const {
    selectProductType,
    setSelectProductType,
    selectGiftingType,
    setSelectGiftingType,
    errors,
    control,
    categoryChildren,
    setCategoryChildren,
    register,
    handleSubmit,
    handleSubmitCategory,
    setCategoryImg,
    categoryImg,
    error,
    isSubmitted,
  } = useCategorySubmit();

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4">
        <form onSubmit={handleSubmit(handleSubmitCategory)}>
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            {/* category image upload */}
            <CategoryImgUpload
              isSubmitted={isSubmitted}
              setImage={setCategoryImg}
              image={categoryImg}
            />
            {/* category image upload */}

            {/* category parent */}
            <CategoryParent register={register} errors={errors} />
            {/* category parent */}

            <CategoryChildren
              categoryChildren={categoryChildren}
              setCategoryChildren={setCategoryChildren}
              error={error}
            />

            {/* Product Type */}
            <div className="mb-6">
              <p className="mb-0 text-base text-black">Product Type</p>
              <div className="category-add-select select-bordered">
                <ProductType
                  setSelectProductType={setSelectProductType}
                  control={control}
                  errors={errors}
                />
              </div>
            </div>
            {/* Product Type */}

            {/* Gifting Type */}
            <div className="mb-6">
              <p className="mb-0 text-base text-black">Gifting Type</p>
              <div className="category-add-select select-bordered">
                <GiftingType
                  setSelectGiftingType={setSelectGiftingType}
                  control={control}
                  errors={errors}
                  isVisible={selectProductType === 'gifting'}
                />
              </div>
            </div>
            {/* Gifting Type */}

            {/* Category Description */}
            <CategoryDescription register={register} />
            {/* Category Description */}

            <button className="tp-btn px-7 py-2">Add Category</button>
          </div>
        </form>
      </div>
      <div className="col-span-12 lg:col-span-8">
        <CategoryTables />
      </div>
    </div>
  );
};

export default AddCategory;
