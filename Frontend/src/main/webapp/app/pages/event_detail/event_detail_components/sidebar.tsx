import React from 'react';
import './sidebar.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { CustomButton } from 'app/shared/components/button';
import { Translate } from 'react-jhipster';

interface DiscountItem {
  id: string;
  code: string;
  description: string;
  percentage: number;
  maxUsers: number;
  usedUsers: string[];
  [key: string]: any;
}

interface SidebarProps {
  id: string | null;
  discount: Partial<DiscountItem> | Record<string, unknown>;
  setDiscount: (discount: DiscountItem | Record<string, unknown>) => void;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  alreadyUsed?: boolean;
}

const promoData = {
  logo: 'ticketbox',
  header: '"Khót gióng" show hót',
  title: 'Nhận mã',
  subtitle: 'cùng FU-Event',
  badges: [
    { text: 'Giảm 20K', sub: 'cho đơn từ 200K' },
    { text: 'Giảm 50K', sub: 'cho đơn từ 500K' },
  ],
  buttonText: 'Dùng mã ngay',
};

export const Sidebar: React.FC<SidebarProps> = ({ id, discount, setDiscount }) => {
  const [promoData2, setPromoData] = useState<DiscountItem[]>([]);
  const [status, setStatus] = useState<string>('');

  const store = useStore();
  //   const user = store?.dataUser as { id: string } | null;
  //   const userId = user?.id || null;

  //   useEffect(() => {
  //     if (id) {
  //       setPromoData([]); // reset khi id đổi
  //       setStatus('');

  //       // Gọi API lấy danh sách discount
  //       axios
  //         .get<ApiResponse<DiscountItem | DiscountItem[]>>(`http://localhost:9999/api/discounts/${id}`)
  //         .then(res => {
  //           if (res.data.success) {
  //             // Xử lý trường hợp API trả về 1 object thay vì mảng
  //             const data = Array.isArray(res.data.data) ? res.data.data : [res.data.data];

  //             // Chuẩn hóa dữ liệu
  //             const normalized: DiscountItem[] = data.map(d => ({
  //               ...d,
  //               usedUsers: d.usedUsers || [],
  //               maxUsers: d.maxUsers || 0,
  //             }));

  //             setPromoData(normalized);
  //           }
  //         })
  //         .catch(err => console.error(err));
  //     }
  //   }, [id]);

  const handleApplyDiscount = async (item: DiscountItem) => {
    // try {
    //   // Gọi API cập nhật trạng thái sử dụng voucher
    //   const res = await axios.put<ApiResponse<DiscountItem>>(`http://localhost:9999/api/users/discounts/${item.id}`, { userId: userId });
    //   if (res.data.success) {
    //     setDiscount(item);
    //     setStatus(item.id);
    //     // Cập nhật lại data local sau khi dùng thành công
    //     const updated = promoData2.map(d =>
    //       d.id === item.id
    //         ? {
    //             ...res.data.data,
    //             usedUsers: res.data.data.usedUsers || [],
    //             maxUsers: res.data.data.maxUsers || 0,
    //           }
    //         : d
    //     );
    //     setPromoData(updated);
    //     if (res.data.alreadyUsed) {
    //       console.log('User đã từng dùng voucher này trước đó');
    //     }
    //   } else {
    //     alert(res.data.message);
    //   }
    // } catch (err) {
    //   console.error(err);
    //   alert('Có lỗi xảy ra');
    // }
  };

  return (
    <div className="sidebar">
      {promoData2.map(item => {
        const isFull = (item.usedUsers?.length || 0) >= (item.maxUsers || 0);
        return (
          <div className="promo-card" key={item.id}>
            <div className="promo-header">
              <div className="ticketbox-logo">FU-Event</div>
            </div>
            <div className="promo-content">
              <h3>{item.description}</h3>
              <h2 className="promo-title">
                <Translate contentKey="global.take_code">Nhận mã {item.code}</Translate>
              </h2>
              <h2 className="promo-subtitle">{promoData.subtitle}</h2>
              <div className="discount-badges">
                <div className="badge">
                  <span className="badge-text">
                    <Translate contentKey="global.discount">Giảm </Translate>
                    {item.percentage}%
                  </span>
                  <span className="badge-sub">
                    <Translate contentKey="global.user_discount">cho người dùng nhanh tay</Translate>
                  </span>
                </div>
              </div>
              {isFull ? (
                <CustomButton name="Hết voucher" contentKey="global.out_of_voucher" className="promo-button" disabled />
              ) : status === item.id ? (
                <CustomButton
                  name="Đang sử dụng"
                  contentKey="event_detail.currently_using"
                  className="promo-button"
                  onClick={() => {
                    setDiscount({});
                    setStatus('');
                  }}
                />
              ) : (
                <CustomButton name={promoData.buttonText} className="promo-button" onClick={() => handleApplyDiscount(item)} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
