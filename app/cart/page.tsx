"use client";
import styles from "./cart.module.css";
import Navbar from "../../components/Navbar/Navabr";
import Footer from "../../components/Footer/footer";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { IoCubeSharp } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import {useCart} from "@/hooks/cart/useCart";
import Loading from "@/app/ui/loaders/Loading"; // تأكد من المسار
import { MdDeleteForever } from "react-icons/md";



const CartPage = () => {

    const {data, loading, error, updateQuantity, removeItem} = useCart();

    if(loading) return <Loading />;

    console.log(data);
    const subtotal =  Array.isArray(data) && data.reduce( (acc, item) => acc + item.price * item.quantity, 0 );
    const shipping = 12;
    const total = subtotal + shipping;



    if (data.length === 0) {
        return (
            <div className="cartPage">
                <Navbar  />
                <div className="container">
                    <div className={styles.emtyCart}>
                        <PiShoppingCartSimpleLight size={100} />
                        <p>لا توجد منتجات في السله</p>
                        <a href="/">العودة للتسوق</a>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="cartPage">
            <Navbar  />
            <div className="container">
                <div className={styles.cartcontent}>
                    <div className={styles.cart}>
                        <div className={styles.message}>
                            <IoCubeSharp size={22} color="rgba(244, 63, 94, 1)" />
                            <h5>
                                Shipping & taxes <span>${shipping.toFixed(2)}</span> calculated
                                at checkout
                            </h5>
                        </div>

                        <table className={styles.cartTable}>
                            <thead>
                            <tr>
                                <th>المنتج</th>
                                <th>السعر</th>
                                <th>العدد</th>
                                <th>المجموع</th>
                                <th>اجراء</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(data) && data.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className={styles.product}>
                                            <img src={item.image || item.product.thumbnail} alt={item.name} />
                                            {item.name}
                                        </div>
                                    </td>
                                    <td>${Number(item.price).toFixed(2)}</td>
                                    <td>
                                        <div className={styles.atom}>
                      <span
                          onClick={() =>
                              updateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                              )
                          }
                      >
                        <LuMinus size={33} />
                      </span>
                                            <input
                                                type="number"
                                                min={1}
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateQuantity(
                                                        item.id,
                                                        Math.max(1, parseInt(e.target.value) || 1)
                                                    )
                                                }
                                                className={styles.quantityInput}
                                            />
                                            <span
                                                onClick={() =>
                                                    updateQuantity(item.id, item.quantity + 1)
                                                }
                                            >
                        <GoPlus size={33} />
                      </span>
                                        </div>
                                    </td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td><button className={styles.deleteBtn}onClick={()=> removeItem(item.id)}><MdDeleteForever size={22} color={"red"}/></button></td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                    </div>

                    <div className={styles.cartTotal}>
                        <h3>المجموع</h3>
                        <div className={styles.totalItem}>
                            <span>المجموع الفرعي</span>
                            <span>${Number(subtotal).toFixed()}</span>
                        </div>
                        <div className={styles.totalItem}>
              <span>
                الشحن الى <span>العراق بغداد</span>
              </span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className={styles.totalItem}>
                            <span>المجموع</span>
                            <span>${Number(total).toFixed()}</span>
                        </div>
                        <button>المتابعة إلى الدفع</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CartPage;