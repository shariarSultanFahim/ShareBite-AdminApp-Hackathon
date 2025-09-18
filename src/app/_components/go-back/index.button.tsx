'use client';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';

export default function GoBack({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  return (
    <Button
      type='link'
      icon={<FiArrowLeft />}
      onClick={() => router.back()}
      className='font-semibold text-primary-400'
    >
      {children || <>Back to Previous Page</>}
    </Button>
  );
}
