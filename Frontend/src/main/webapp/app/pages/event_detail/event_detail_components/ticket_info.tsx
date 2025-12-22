import React from 'react';
import './ticket_info.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { CustomButton } from 'app/shared/components/button';

interface TicketItem {
  id: string | number;
  name: string;
  price: string;
  originalPrice?: string;
  type: 'ticket' | 'product' | string;
  description?: string;
  note?: string;
  valid?: boolean;
  popular?: boolean;
  [key: string]: any;
}

interface Discount {
  percentage?: number;
  type?: 'All' | 'Ticket' | 'Merch' | string;
  [key: string]: any;
}

interface EventData {
  id: string | number;
  name?: string;
  [key: string]: any;
}

interface TicketInfoProps {
  id: string | number;
  discount: Discount | null;
  event: EventData;
}

interface ApiResponse {
  success: boolean;
  data: TicketItem[];
  message?: string;
}

export const TicketInfo: React.FC<TicketInfoProps> = ({ id, discount, event }) => {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [products, setProducts] = useState<TicketItem[]>([]);
  const [notification, setNotification] = useState<string>('');

  const store = useStore();
  //   const user = (store?.dataUser as { id?: string | number } | null) || {};
  //   const userId = user?.id || null;
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (!id) return;
  //     axios
  //       .get<ApiResponse>(`http://localhost:9999/api/binh/tickets/${id}`)
  //       .then(res => {
  //         let filteredData: TicketItem[] = res.data.data || [];
  //         if (discount && discount.percentage) {
  //           filteredData = filteredData.map(item => {
  //             let price = parseInt(item.price.replace(/\D/g, ''));
  //             if (!isNaN(price)) {
  //               if (
  //                 discount.type === 'All' ||
  //                 (discount.type === 'Ticket' && item.type === 'ticket') ||
  //                 (discount.type === 'Merch' && item.type !== 'ticket')
  //               ) {
  //                 const discountedPrice = price - (price * discount.percentage) / 100;
  //                 return {
  //                   ...item,
  //                   originalPrice: item.price,
  //                   price: discountedPrice.toLocaleString('vi-VN') + ' ₫',
  //                 };
  //               }
  //             }
  //             return item;
  //           });
  //         }
  //         const ticketItems = filteredData.filter(item => item.type === 'ticket');
  //         const productItems = filteredData.filter(item => item.type !== 'ticket');
  //         if (ticketItems.length > 0) {
  //           ticketItems[0] = { ...ticketItems[0], popular: true };
  //         }
  //         setTickets(ticketItems);
  //         setProducts(productItems);
  //       })
  //       .catch(err => console.error(err));
  //   }, [id, discount]);

  const handleAddToCart = (item: TicketItem, type: 'ticket' | 'product') => {
    // const ttl = (10 * 60 + 10) * 1000;
    // localStorage.removeItem('cart');
    // const cartData = {
    //   userId,
    //   event,
    //   discount,
    //   tickets: type === 'ticket' ? [item] : [],
    //   products: type === 'product' ? [item] : [],
    // };
    // setWithExpiry('cart', cartData, ttl);
    // setNotification('Đã thêm vào giỏ hàng, chuyển hướng...');
    // const timer = setTimeout(() => navigate('/query'), 1000);
    // return () => clearTimeout(timer);
  };

  return (
    <div className="de-ticket-info">
      {notification && <div className="de-notification">{notification}</div>}

      {/* --- PHẦN VÉ --- */}
      <h2 className="de-section-title">Thông tin vé</h2>
      <div className="de-tickets-list">
        {tickets.map(ticket => (
          <div key={ticket.id} className={`de-ticket-card ${ticket.popular ? 'de-popular' : ''}`}>
            <div className="de-ticket-header">
              <div className="de-ticket-name-section">
                <h3 className="de-ticket-name">{ticket.name}</h3>
                {ticket.popular && (
                  <span className="de-popular-badge">
                    <Translate contentKey="global.most_popular">Phổ biến nhất</Translate>
                  </span>
                )}
              </div>
              <div className="de-ticket-price-section">
                <div className="de-price-container">
                  {ticket.originalPrice && <span className="de-original-price">{ticket.originalPrice}</span>}
                  <span className="de-current-price">{ticket.price}</span>
                </div>
                {ticket.valid ? (
                  <CustomButton
                    name="Chọn vé"
                    contentKey="global.pick_ticket"
                    className="de-buy-button"
                    onClick={() => handleAddToCart(ticket, 'ticket')}
                  />
                ) : (
                  <CustomButton name="Hết Hàng" contentKey="global.out_of_stock" className="de-buy-button de-expired" disabled />
                )}
              </div>
            </div>
            <div className="de-ticket-body">
              <p className="de-ticket-description">{ticket.description}</p>
              <p className="de-ticket-note">{ticket.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- PHẦN SẢN PHẨM --- */}
      {products.length > 0 && (
        <>
          <h2 className="de-section-title">
            <Translate contentKey="global.alternate_prod">Sản phẩm kèm theo</Translate>
          </h2>
          <div className="de-products-list">
            {products.map(product => (
              <div key={product.id} className="de-ticket-card">
                <div className="de-ticket-header">
                  <div className="de-ticket-name-section">
                    <h3 className="de-ticket-name">{product.name}</h3>
                  </div>
                  <div className="de-ticket-price-section">
                    <div className="de-price-container">
                      {product.originalPrice && <span className="de-original-price">{product.originalPrice}</span>}
                      <span className="de-current-price">{product.price}</span>
                    </div>
                    <CustomButton
                      name="Chọn sản phẩm"
                      contentKey="global.pick_prod"
                      className="de-buy-button"
                      onClick={() => handleAddToCart(product, 'product')}
                    />
                  </div>
                </div>
                <div className="de-ticket-body">
                  <p className="de-ticket-description">{product.description}</p>
                  <p className="de-ticket-note">{product.note}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
