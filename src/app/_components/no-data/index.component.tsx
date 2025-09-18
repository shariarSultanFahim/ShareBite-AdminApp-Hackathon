export default function NoData({ children }: { children?: React.ReactNode }) {
  return <span className='text-gray-400'>{children || 'N/A'}</span>;
}
