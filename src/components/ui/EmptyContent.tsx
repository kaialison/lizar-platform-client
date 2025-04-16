import Image from "next/image";

const EmptyContent = ({
    title = "Không có dữ liệu",
    description = "",
}: {
    title?: string;
    description?: string;
}) => {
  return (
    <div className="relative h-full">
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
      
      <div className="relative h-full flex flex-col items-center justify-center">
        <Image src="/images/empty-state.png" alt="empty" width={100} height={100} />   
        <p className="text-default-400 font-[300]">{title}</p>
        <p className="text-sm text-default-400">{description}</p>
      </div>
    </div>
  );
};

export default EmptyContent;
