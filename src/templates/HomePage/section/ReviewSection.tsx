import React from "react";
import ReviewCarousel from "@/components/carousel-section/ReviewCarousel";
import { Review } from "@/types/review";

export default function ReviewSection() {
    const reviews: Review[] = [
        {
            id: 1,
            content: "Sân ở HappyLand siêu rộng, mặt sân mịn và sạch, ánh sáng buổi tối rất tốt. Không khí thì cực chill vì bao quanh nhiều cây xanh. Đi chơi mà như đi nghỉ dưỡng!",
            avatar: "https://d1j8r0kxyu9tj8.cloudfront.net/files/0oAWM1g4ldNCSBc1nqEF8Y6bpeHmLjgxr1pcHel5.jpg",
            name: "Quốc Quý",
            rating: 5,
        },
        {
            id: 2,
            content: "Mình hay chơi theo nhóm 4 người, sân ở đây setup sẵn lưới và vạch đầy đủ, chỉ việc đến là chiến thôi. Gửi xe dễ, phòng thay đồ sạch, ưng lắm!",
            avatar: "https://d1j8r0kxyu9tj8.cloudfront.net/files/j33WdTtZoZXWZcEOvvi1tcDUGdNdkMFUFqJ2FFdF.png",
            name: "Anh Phương",
            rating: 5,
        },
        {
            id: 3,
            content: "Tính năng xem bản đồ cực hữu ích, nhờ app mà tụi mình tìm được sân gần quán cafe quen, chơi xong là chill tiếp luôn. Giao diện thân thiện, dễ dùng với cả người lớn tuổi.",
            avatar: "https://d1j8r0kxyu9tj8.cloudfront.net/files/53CWpHu1y9mtso4LygfjFwUQhqLodOcNRRaLeUGv.png",
            name: "Hà Trang",
            rating: 5,
        },
        {
            id: 4,
            content: "App có bản đồ xem sân xung quanh cực tiện, có hôm tụi mình đi chơi xa mà vẫn book được sân gần homestay. Siêu linh hoạt!",
            avatar: "https://d1j8r0kxyu9tj8.cloudfront.net/files/qWpUZOZMxMrRkMTFsRh8mCtzJti0t0BXgVTldies.png",
            name: "Bách Lê",
            rating: 5,
        },
        {
            id: 5,
            content: "App đặt sân tiện thật sự, không cần gọi điện, chọn giờ là có luôn. Nhắc lịch đúng giờ, có hôm mình quên mà app cứu kèo nguyên team",
            avatar: "https://d1j8r0kxyu9tj8.cloudfront.net/files/6kywi3m6hI39jYceuCgfjIrr9XeEHulPkFNnas8I.png",
            name: "Quang Tuấn",
            rating: 5,
        },
    ];

    return (
        <section className="lg:py-0 py-20">
            <div>
                <div className="grid grid-cols-1 gap-10">
                    <div className="grid grid-cols-1 text-center gap-3">
                        <div className="lg:text-md text-sm lg:leading-text-md leading-sm text-secondary-700 lg:inline hidden">
                            TRẢI NGHIỆM THỰC TẾ TỪ CỘNG ĐỒNG PICKLEBALL
                        </div>
                        <div className="lg:text-md text-sm lg:leading-text-md leading-sm text-secondary-700 lg:hidden inline">
                            TRẢI NGHIỆM THỰC TẾ TỪ CỘNG ĐỒNG
                        </div>

                        <div className="lg:text-display-md text-display-xs lg:leading-display-md leading-display-xs font-bold">
                            NGƯỜI CHƠI NÓI GÌ?
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <ReviewCarousel reviews={reviews} />
                    </div>
                </div>
            </div>
        </section>
    );
}
