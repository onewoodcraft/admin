import React from "react";
import ReactSelect from "react-select";
import { FieldErrors, Controller, Control } from "react-hook-form";
import ErrorMsg from "../../common/error-msg";

// prop type
type IPropType = {
  errors: FieldErrors<any>;
  control: Control;
  setSelectGiftingType: React.Dispatch<React.SetStateAction<string>>;
  default_value?: string;
  isVisible: boolean;
};

const GiftingType = ({
  errors,
  control,
  default_value,
  setSelectGiftingType,
  isVisible
}: IPropType) => {
  // handleSelectGifting
  const handleSelectGifting = (value: string) => {
    setSelectGiftingType(value);
  };

  if (!isVisible) return null;
  
  return (
    <>
      <Controller
        name="giftingType"
        control={control}
        rules={{
          required: default_value ? false : "Gifting type is required for gifting products!",
        }}
        render={({ field }) => (
          <ReactSelect
            {...field}
            value={field.value}
            defaultValue={
              default_value
                ? {
                    label: default_value,
                    value: default_value,
                  }
                : {
                    label: "Select Gifting Type...",
                    value: 0,
                  }
            }
            onChange={(selectedOption) => {
              field.onChange(selectedOption);
              handleSelectGifting(selectedOption?.value);
            }}
            options={[
              { value: "wedding", label: "Wedding Gifting" },
              { value: "corporate", label: "Corporate Gifting" },
              { value: "festive", label: "Festive Gifting" },
              { value: "seasonal", label: "Seasonal Gifting" },
              { value: "housewarming", label: "Housewarming Gifting" },
              { value: "anniversary", label: "Anniversary Gifting" },
            ]}
          />
        )}
      />
      <ErrorMsg msg={errors?.giftingType?.message as string} />
    </>
  );
};

export default GiftingType; 