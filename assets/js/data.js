// Nguồn nội dung duy nhất. Sau khi sửa, chạy: node scripts/build.mjs
export const site = {
  // URL GitHub Pages chính thức, gồm tên repository và dấu / cuối.
  url: 'https://kimanaru-1010.github.io/tuoitre-training/',
  repository: 'tuoitre-training',
  name: 'Trung tâm Đào tạo Báo Tuổi Trẻ',
  tagline: 'Kết nối tri thức báo chí hiện đại & năng lực truyền thông thực chiến',
  description: 'Khám phá các chương trình học thực hành báo chí, truyền thông tuyển sinh, xây dựng thương hiệu và ứng dụng AI tại Trung tâm Đào tạo Báo Tuổi Trẻ.',
  address: '60A Hoàng Văn Thụ, Phường Đức Nhuận, TP. Hồ Chí Minh',
  phone: '0935574545',
  website: 'https://tuoitre.vn/tuoi-tre-dao-tao-e1939.htm',
  heroImage: 'assets/images/sinh-vien-02.jpg',
  heroAlt: 'Chương trình hợp tác đào tạo thực hành giữa Báo Tuổi Trẻ và Trường Đại học Nguyễn Tất Thành',
  socialImage: 'assets/images/social-preview.png',
};

export const programs = [
  {
    slug: 'sinh-vien',
    nav: 'Sinh viên',
    category: 'TRẢI NGHIỆM TÒA SOẠN',
    title: 'Sinh viên học thực hành tại Báo Tuổi Trẻ',
    homeTitle: 'Sinh viên học thực hành tại Báo Tuổi Trẻ',
    summary: 'Bước từ giảng đường vào tòa soạn. Học thực hành, trải nghiệm nghề nghiệp trong môi trường báo chí chuyên nghiệp.',
    description: 'Khám phá các chương trình học thực hành, trải nghiệm nghề nghiệp và tiếp cận môi trường làm báo chuyên nghiệp tại Báo Tuổi Trẻ dành cho sinh viên các trường đại học, cao đẳng.',
    image: 'assets/images/sinh-vien-01.jpg',
    articles: [
      {
        title: 'Sinh viên HUFLIT học thực hành, trải nghiệm nghề nghiệp tại Báo Tuổi Trẻ',
        url: 'https://tuoitre.vn/video/sinh-vien-huflit-hoc-thuc-hanh-trai-nghiem-nghe-nghiep-tai-bao-tuoi-tre-202432.htm',
        thumbnail: 'assets/images/sinh-vien-01.jpg',
      },
      {
        title: 'Hơn 2.000 sinh viên Trường Đại học Nguyễn Tất Thành học thực hành tại Báo Tuổi Trẻ',
        url: 'https://tuoitre.vn/hon-2-000-sinh-vien-truong-dai-hoc-nguyen-tat-thanh-hoc-thuc-hanh-tai-bao-tuoi-tre-20251114133554736.htm',
        thumbnail: 'assets/images/sinh-vien-02.jpg',
      },
      {
        title: 'Sinh viên Trường Đại học Ngoại ngữ - Tin học TP.HCM học thực hành tại Báo Tuổi Trẻ',
        url: 'https://tuoitre.vn/sinh-vien-truong-dai-hoc-ngoai-ngu-tin-hoc-tphcm-hoc-thuc-hanh-tai-bao-tuoi-tre-100260911104826128.htm',
        thumbnail: 'assets/images/sinh-vien-03.jpg',
      },
      {
        title: 'Sinh viên Trường Đại học Hoa Sen học thực hành tại Báo Tuổi Trẻ',
        url: 'https://tuoitre.vn/sinh-vien-truong-dai-hoc-hoa-sen-hoc-thuc-hanh-tai-bao-tuoi-tre-20250325094809093.htm',
        thumbnail: 'assets/images/sinh-vien-04.jpg',
      },
    ],
  },
  {
    slug: 'lam-bao-cung-tuoi-tre',
    nav: 'Làm báo cùng Tuổi Trẻ',
    category: 'THỰC HÀNH NGHỀ BÁO',
    title: 'Làm báo cùng Tuổi Trẻ',
    homeTitle: 'Làm báo cùng Tuổi Trẻ',
    summary: 'Học cùng phóng viên, đi vào thực tế và tự tay sản xuất những tác phẩm báo chí đa phương tiện.',
    description: 'Chương trình đưa sinh viên trực tiếp tham gia thực hành cùng phóng viên, biên tập viên và chuyên gia của Báo Tuổi Trẻ, từ xây dựng nội dung, phỏng vấn, quay dựng đến sản xuất tác phẩm báo chí đa phương tiện.',
    image: 'assets/images/lam-bao-cung-tuoi-tre-02.jpg',
    articles: [
      {
        title: 'Hơn 100 sinh viên Trường Đại học Lạc Hồng học “Làm báo cùng Tuổi Trẻ”',
        url: 'https://tuoitre.vn/hon-100-sinh-vien-truong-dai-hoc-lac-hong-hoc-lam-bao-cung-tuoi-tre-100260909114209206.htm',
        thumbnail: 'assets/images/lam-bao-cung-tuoi-tre-01.jpg',
      },
      {
        title: 'Rời lớp học, sinh viên Trường ĐH Lạc Hồng xuống phố học làm báo cùng Tuổi Trẻ',
        url: 'https://tuoitre.vn/video/roi-lop-hoc-sinh-vien-truong-dh-lac-hong-xuong-pho-hoc-lam-bao-cung-tuoi-tre-203079.htm',
        thumbnail: 'assets/images/lam-bao-cung-tuoi-tre-02.jpg',
      },
      {
        title: 'Hiệu trưởng Trường ĐH Cửu Long: Chương trình “Làm báo cùng Tuổi Trẻ” thiết thực, bổ ích cho sinh viên',
        url: 'https://tuoitre.vn/hieu-truong-truong-dh-cuu-long-chuong-trinh-lam-bao-cung-tuoi-tre-thiet-thuc-bo-ich-cho-sinh-vien-100260907095802397.htm',
        thumbnail: 'assets/images/lam-bao-cung-tuoi-tre-03.jpg',
      },
      {
        title: 'Sinh viên Trường Đại học Lạc Hồng học “Làm báo cùng Tuổi Trẻ”',
        url: 'https://tuoitre.vn/sinh-vien-truong-dai-hoc-lac-hong-hoc-lam-bao-cung-tuoi-tre-10026081817542649.htm',
        thumbnail: 'assets/images/lam-bao-cung-tuoi-tre-04.jpg',
      },
      {
        title: 'Sinh viên Trường Đại học Cửu Long hào hứng học “Làm báo cùng Tuổi Trẻ”',
        url: 'https://tuoitre.vn/sinh-vien-truong-dai-hoc-cuu-long-hao-hung-hoc-lam-bao-cung-tuoi-tre-100260814143931772.htm',
        thumbnail: 'assets/images/lam-bao-cung-tuoi-tre-05.jpg',
      },
    ],
  },
  {
    slug: 'truyen-thong-tuyen-sinh',
    nav: 'Truyền thông tuyển sinh',
    category: 'KẾT NỐI & THƯƠNG HIỆU',
    title: 'Truyền thông trong tuyển sinh và xây dựng thương hiệu',
    homeTitle: 'Truyền thông tuyển sinh & xây dựng thương hiệu',
    summary: 'Nâng cao kỹ năng truyền thông tuyển sinh, xây dựng hình ảnh tổ chức và kết nối hiệu quả với báo chí.',
    description: 'Các chương trình đào tạo thực tiễn giúp cán bộ, giảng viên và đội ngũ truyền thông nâng cao kỹ năng truyền thông tuyển sinh, xây dựng hình ảnh tổ chức và phối hợp hiệu quả với báo chí.',
    image: 'assets/images/truyen-thong-tuyen-sinh-01.jpg',
    articles: [
      {
        title: 'Trường Đại học Công Thương TP.HCM nâng cao năng lực truyền thông từ thực tiễn nghề báo',
        url: 'https://tuoitre.vn/video/truong-dai-hoc-cong-thuong-tphcm-nang-cao-nang-luc-truyen-thong-tu-thuc-tien-nghe-bao-198481.htm',
        thumbnail: 'assets/images/truyen-thong-tuyen-sinh-01.jpg',
      },
      {
        title: 'Học viện Hàng không Việt Nam học làm truyền thông tuyển sinh từ người làm báo',
        url: 'https://tuoitre.vn/hoc-vien-hang-khong-viet-nam-hoc-lam-truyen-thong-tuyen-sinh-tu-nguoi-lam-bao-100260924123036027.htm',
        thumbnail: 'assets/images/truyen-thong-tuyen-sinh-02.jpg',
      },
      {
        title: 'Báo điện tử Tuổi Trẻ hợp tác với Học viện Hàng không Việt Nam',
        url: 'https://tuoitre.vn/bao-dien-tu-tuoi-tre-hop-tac-voi-hoc-vien-hang-khong-viet-nam-100260806183140372.htm',
        thumbnail: 'assets/images/truyen-thong-tuyen-sinh-03.jpg',
      },
      {
        title: 'Báo Tuổi Trẻ tập huấn kỹ năng truyền thông cho cán bộ, giảng viên Trường Đại học Bách khoa TP.HCM',
        url: 'https://tuoitre.vn/bao-tuoi-tre-tap-huan-ky-nang-truyen-thong-cho-can-bo-giang-vien-truong-dai-hoc-bach-khoa-tphcm-100260626125644296.htm',
        thumbnail: 'assets/images/truyen-thong-tuyen-sinh-04.jpg',
      },
      {
        title: 'Báo Tuổi Trẻ tập huấn nâng cao năng lực truyền thông cho Trường Đại học Công Thương TP.HCM',
        url: 'https://tuoitre.vn/bao-tuoi-tre-tap-huan-nang-cao-nang-luc-truyen-thong-cho-truong-dai-hoc-cong-thuong-tp-hcm-20260606121353164.htm',
        thumbnail: 'assets/images/truyen-thong-tuyen-sinh-05.jpg',
      },
      {
        title: 'Báo Tuổi Trẻ tập huấn truyền thông phục vụ tuyển sinh, xây dựng thương hiệu',
        url: 'https://tuoitre.vn/bao-tuoi-tre-tap-huan-truyen-thong-phuc-vu-tuyen-sinh-xay-dung-thuong-hieu-2025121313321748.htm',
        thumbnail: 'assets/images/truyen-thong-tuyen-sinh-06.jpg',
      },
    ],
  },
  {
    slug: 'truyen-thong-ai',
    nav: 'Truyền thông & AI',
    category: 'SÁNG TẠO TRONG KỶ NGUYÊN SỐ',
    title: 'Nâng cao năng lực truyền thông trong thời đại AI',
    homeTitle: 'Nâng cao năng lực truyền thông trong thời đại AI',
    summary: 'Ứng dụng AI vào sáng tạo nội dung, thiết kế và sản xuất video. Phát triển năng lực truyền thông trong môi trường số.',
    description: 'Các chương trình tập trung vào ứng dụng AI trong sáng tạo nội dung, prompting, thiết kế, xử lý hình ảnh, sản xuất video, hậu kỳ và nâng cao năng lực truyền thông trong môi trường số.',
    image: 'assets/images/truyen-thong-ai-01.jpg',
    articles: [
      {
        title: 'Thu hẹp khoảng cách đào tạo và thực tiễn truyền thông trong kỷ nguyên AI',
        url: 'https://tuoitre.vn/thu-hep-khoang-cach-dao-tao-va-thuc-tien-truyen-thong-trong-ky-nguyen-ai-20260120171250258.htm',
        thumbnail: 'assets/images/truyen-thong-ai-01.jpg',
      },
      {
        title: 'Báo Tuổi Trẻ tập huấn truyền thông cho cán bộ Agribank',
        url: 'https://tuoitre.vn/bao-tuoi-tre-tap-huan-truyen-thong-cho-can-bo-agribank-20250725104444868.htm',
        thumbnail: 'assets/images/truyen-thong-ai-02.jpg',
      },
      {
        title: 'Nâng cao năng lực giảng dạy truyền thông trước làn sóng trí tuệ nhân tạo',
        url: 'https://tuoitre.vn/video/nang-cao-nang-luc-giang-day-truyen-thong-truoc-lan-song-tri-tue-nhan-tao-193251.htm',
        thumbnail: 'assets/images/truyen-thong-ai-03.jpg',
      },
    ],
  },
];
