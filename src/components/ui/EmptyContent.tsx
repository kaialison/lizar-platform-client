import Image from "next/image";
import Link from "next/link";

const EmptyContent = ({
    title = "Không có dữ liệu",
    headerColorScheme = 'light'
}: {
    title?: string;
    headerColorScheme?: 'dark' | 'light';
}) => {
  return (
    <div className="min-h-screen relative" data-header-scheme={headerColorScheme}>
      <div className="absolute inset-0">
        <Image
          src="/images/empty-background.png"
          alt="empty background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Image src="/images/empty-state.png" alt="empty" width={100} height={100} />   
        <p className="text-md font-semibold mt-4">{title}</p>
        <Link
            href="/"
            className="mt-4 bg-primary-gradient text-white text-md font-semibold px-6 py-2 rounded-lg"
        >
            Trở về Home
        </Link>
      </div>
    </div>
  );
};

export default EmptyContent;
