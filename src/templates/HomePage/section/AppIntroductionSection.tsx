import AppBanner from "../components/AppBanner"
import AppFeature from "../components/AppFeature"
export default function AppIntroDuctionSection() {
    const features: any[] = [
        {
            id: "01",
            imageUrl: "/images/app-screen1.png",
            text: "Đặt sân nhanh, dễ dàng  mọi lúc tiết kiệm thời gian.",
            highlightedText: "Đặt sân nhanh, dễ dàng",
            description: "Người chơi có thể dễ dàng chọn giờ và sân thi đấu phù hợp chỉ trong vài giây thao tác đơn giản, giúp tiết kiệm thời gian và nâng cao trải nghiệm đặt sân.",
            isReversed: false,
        },
        {
            id: "02",
            imageUrl: "/images/app-screen2.png",
            text: "Thông báo nhắc lịch  hỗ trợ quản lý thời gian hiệu quả hơn",
            highlightedText: "Thông báo nhắc lịch",
            description: "Hệ thống sẽ tự động gửi thông báo nhắc lịch trước giờ chơi. Nhờ đó, bạn sẽ không bao giờ bỏ lỡ bất kỳ trận đấu nào.",
            isReversed: true,
        },
        {
            id: "03",
            imageUrl: "/images/app-screen3.png",
            text: "Tìm sân  quanh bạn",
            highlightedText: "quanh bạn",
            description: "Khám phá các sân pickleball gần nhất bằng bản đồ tương tác. Dễ dàng so sánh vị trí, tiện ích, giá cả và lựa chọn sân phù hợp với bạn.",
            isReversed: false,
        },
        {
            id: "04",
            imageUrl: "/images/app-screen4.png",
            text: "Thanh toán online  tiện lợi, nhanh chóng và an toàn.",
            highlightedText: "Thanh toán online",
            description: "Nhiều phương thức thanh toán khác nhau như ví điện tử, thẻ ngân hàng hoặc chuyển khoản. Mọi giao dịch đều được mã hóa, đảm bảo bảo mật thông tin tuyệt đối cho người dùng.",
            isReversed: true,
        }

    ];
    return (
        <section className="pb-20">
            <div className="container">
                <div className="sm:mx-0 -mx-4">
                    <AppBanner />
                </div>
                <div className="grid grid-cols-1 gap-20  lg:px-20 px-0">
                    <div className="grid grid-cols-1 text-center gap-3">
                        <div className="lg:text-md text-sm lg:leading-text-md leading-sm text-secondary-700">TỐI ƯU TRẢI NGHIỆM ĐẶT SÂN TỪ A ĐẾN Z</div>
                        <div className="lg:text-display-md text-display-xs lg:leading-display-md leading-display-xs font-bold lg:inline hidden ">TÍNH NĂNG NỔI BẬT CỦA ỨNG DỤNG</div>
                        <div className="lg:text-display-md text-display-xs lg:leading-display-md leading-display-xs font-bold lg:hidden inline">TÍNH NĂNG NỔI BẬT</div>

                    </div>
                    {features.map((feature) => (
                        <AppFeature key={feature.id} feature={feature} />
                    ))}
                </div>

            </div>
        </section>
    )
}