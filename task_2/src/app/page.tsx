'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type FormData = {
  time: string;
  quantity: number;
  pump: string;
  revenue: number;
  unitPrice: number;
};

const TransactionForm = () => {
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    setSubmitStatus('success');
  };

  return (
    <div className="mx-auto mt-4 p-2 bg-white rounded-lg shadow-sm max-w-[620px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-start mb-6 shadow-md p-4 border-transparent w-[650px] h-[112px] justify-between mx-auto -ml-5">
          <div className='flex flex-col gap-y-2'>
            <button className="mr-auto text-black-500 flex gap-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className='text-sm'>Đóng</span>
            </button>
            <h2 className="text-3xl font-bold text-center flex-grow">Nhập giao dịch</h2>
          </div>
          <button
            type="submit"
            className="inline-block py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cập nhật
          </button>
        </div>
        <div className="my-4 border rounded-sm p-2">
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 opacity-50">Thời gian</label>
          <input
            type="datetime-local"
            id="time"
            {...register("time", { required: "Thời gian là bắt buộc" })}
            className="block w-full rounded-md shadow-sm outline-none"
          />

        </div>
        {errors.time && <p className="text-sm text-red-600 italic ">{errors.time.message}</p>}

        <div className="my-4 border rounded-sm p-2">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Số lượng</label>
          <input
            type="number"
            id="quantity"
            step="0.01"
            {...register("quantity", {
              required: "Số lượng là bắt buộc",
              min: { value: 0, message: "Số lượng phải lớn hơn 0" }
            })}
            className="mt-1 block w-full rounded-md outline-none"
          />

        </div>
        {errors.quantity && <p className="text-sm text-red-600 italic">{errors.quantity.message}</p>}

        <div className="my-4 border rounded-sm p-2">
          <label htmlFor="pump" className="block text-sm font-medium text-gray-700">Trụ</label>
          <select
            id="pump"
            {...register("pump", { required: "Trụ là bắt buộc" })}
            className="mt-1 block w-full rounded-md outline-none"
          >
            <option value=""></option>
            <option value="1">Trụ 1</option>
            <option value="2">Trụ 2</option>
            <option value="3">Trụ 3</option>
          </select>

        </div>
        {errors.pump && <p className="text-sm text-red-600 italic">{errors.pump.message}</p>}

        <div className="my-4 border rounded-sm p-2">
          <label htmlFor="revenue" className="block text-sm font-medium text-gray-700">Doanh thu</label>
          <input
            type="number"
            id="revenue"
            {...register("revenue", {
              required: "Doanh thu là bắt buộc",
              min: { value: 0, message: "Doanh thu phải lớn hơn hoặc bằng 0" }
            })}
            className="mt-1 block w-full rounded-md outline-none"
          />

        </div>
        {errors.revenue && <p className="text-sm text-red-600 italic">{errors.revenue.message}</p>}

        <div className="my-4 border rounded-sm p-2">
          <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">Đơn giá</label>
          <input
            type="number"
            id="unitPrice"
            {...register("unitPrice", {
              required: "Đơn giá là bắt buộc",
              min: { value: 0, message: "Đơn giá phải lớn hơn 0" }
            })}
            className="mt-1 block w-full rounded-md outline-none"
          />
        </div>
        {errors.unitPrice && <p className="text-sm text-red-600 italic">{errors.unitPrice.message}</p>}
      </form>

      {submitStatus === 'success' && (
        <Alert className="mt-4 bg-green-300" variant="default">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle className='font-bold'>Thành công</AlertTitle>
          <AlertDescription>
            Giao dịch đã được cập nhật thành công.
          </AlertDescription>
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert className="mt-4" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className='font-bold'>Lỗi</AlertTitle>
          <AlertDescription>
            Đã xảy ra lỗi khi cập nhật giao dịch. Vui lòng thử lại.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default TransactionForm;