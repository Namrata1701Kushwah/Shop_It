import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getAdminProducts } from '../../actions/productActions';
import { allOrders } from "../../actions/orderActions";
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { allUsers } from "../../actions/userActions";

const Dashboard = () => {
    // hsgkkkkkkkkkkkkkk

    const dispatch = useDispatch();

    const {products} = useSelector(state=>state.products)
    const {users} = useSelector(state=>state.allUsers)
    const {orders, totalAmount, loading} = useSelector(state=>state.allOrders)
    useEffect(()=>{
          dispatch(getAdminProducts())
          dispatch(allOrders())
          dispatch(allUsers())
    },[dispatch])

    let outOfStock = 0;

    products?.products?.forEach(product => {
        if(product.stock === 0){
             outOfStock +=1;
        }
    });
    return (
        <Fragment>
            <div className="row">'
                <div className="col-5 col-md-2">

                    <Sidebar />
                </div>
                <div className="col-9 col-md-18">
                    <h1 className="my-9">Dashboard</h1>
                    {loading ? <Loader/> : (
                        <Fragment>
                            <MetaData title={'Admin Dashboard'}/>
                            <div className="row pr-4">
                        <div className="col-xl-12 col-sm-12 mb-3">
                            <div className="card text-white bg-primary o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Total Amount<br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row pr-4">
                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-success o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Products<br /> <b>{products?.products && products?.products?.length}</b></div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-danger o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Orders<br /> <b>{orders && orders?.length}</b></div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-info o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" href="/admin/users">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-warning o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
                                </div>
                            </div>
                        </div>
                        </div>
                        </Fragment>
                    )}
                  
                    </div>
                </div>
            

        </Fragment>
    )
}


export default Dashboard; 