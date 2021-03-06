import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader/Loader'

import { getMyOrders, cleareError } from '../../store/actions/orderActions'

const Orders = () => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { orders, loading, error } = useSelector(state => state.myOrders)

    useEffect(() => {
        dispatch(getMyOrders())
    }, [dispatch])


    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(cleareError())
        }
    }, [error, alert, dispatch])


    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    {orders.length > 0 ? (
                        <Fragment>
                            <MetaData title={"My Orders List-BDShop"} />
                            <div className="container">
                                <table className="table product-table my-4">
                                    <thead>
                                        <tr>
                                            <th>Order Id</th>
                                            <th>NumOfItems</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {orders.map(order => (
                                            <tr>
                                                <td>
                                                    <h5><strong>{order._id}</strong></h5>
                                                </td>
                                                <td>{order.orderItems.length}</td>
                                                <td>{order.totalPrice}</td>
                                                <td>
                                                    <p
                                                        className={`${order.orderStatus === 'Processing' ?
                                                            'text-danger' : order.orderStatus === 'Shipping' ?
                                                                'text-primary' : 'text-success'
                                                            }`}
                                                    >
                                                        {order.orderStatus}
                                                    </p>
                                                </td>
                                                <td>
                                                    <Link to={`/profile/me/orders/${order._id}`} className="my_btn">
                                                        <i className="fa fa-eye"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Fragment>
                    ) : (
                        <h1> Your Order List Is Empty </h1>
                    )}
                </Fragment>
            )
            }
        </Fragment >
    );
}

export default Orders;
