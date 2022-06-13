import { Fragment, useEffect, useState } from "react";
import { Carousel } from 'react-bootstrap'
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";


import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors } from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";

const ProductDetails = ({ match }) => {

    const[quantity , setQuantity] =  useState(1)
    const dispatch = useDispatch();
    const alert = useAlert();

    const { product, loading, error } = useSelector((state) => state.productDetails)
    console.log(">>>",product);
    useEffect(() => {
        dispatch(getProductDetails(match.params.id))
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    },[match.params.id, error, alert, dispatch])


     const addToCart = ()=>{
         dispatch(addItemToCart(match.params.id, quantity));
         alert.success('Item Added to Cart')
     }
    

    const increaseQty = () => {
        const count = document.querySelector('.count')

        if (count.valueAsNumber >= product.product.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }

    const decreaseQty = () => {

        const count = document.querySelector('.count')

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty)        

    }






    return (
        
        // <Fragment>
          
        //     {loading ? <Loader /> : (
        //         <Fragment>
        //               <MetaData title={product.name}/>
        //             <div className="row f-flex justify-content-around">
        //                 <div className="col-12 col-lg-5 img-fluid" id="product_image">
        //                     <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">

        //                         {/* {product?.product?.images.map(image => {
        //                             console.log("jhgfddgjhcgjxf", image.url);
        //                             return (
        //                                 <div className="carousel-inner">

        //                                     <div className="carousel-item active">
        //                                         <img className="d-block w-100" src={image.url} alt={product.title} />
        //                                     </div>
        //                                 </div>
        //                             )
        //                         }


        //                         )} */}

        //                     </div>
        //                    { console.log( product.product )}
        //                     <Carousel pause='hover'>
        //                        l { product?.product?.images?.map(image =>(
        //                             <Carousel.Item key={image.pubic_id}>
        //                                 <img className="d-block w-100" src={image.url} alt={product.title} />
        //                             </Carousel.Item> 
        //                             ))}
                                    
                                    
        //                     </Carousel>
        //                 </div>

        //                 <div className="col-12 col-lg-5 mt-5">
        //                     <h3>{product?.product?.name}</h3>
        //                     <p id="product_id">{product?.product?._id}</p>

        //                     <hr />

        //                     <div className="rating-outer">
        //                         <div className="rating-inner" style={{width:`${(product.ratings / 5)*100}%`}}></div>
        //                     </div>
        //                     <span id="no_of_reviews">({product?.product?.numOfReviews} Reviews)</span>

        //                     <hr />

        //                     <p id="product_price">Rs.{product?.product?.price}</p>
        //                     <div className="stockCounter d-inline">
        //                         <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

        //                         <input type="number" className="form-control count d-inline" value={quantity} readOnly />

        //                         <span className="btn btn-primary plus"  onClick={increaseQty}>+</span>
        //                     </div>
        //                     <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product?.product?.stock === 0}>Add to Cart</button>

        //                     <hr />

        //                     <p>Status: <span id="stock_status" className={product?.product?.stock>0 ? 'greenColor' : 'redColor'}>{product?.product?.stock > 0 ?'In Stock': 'Out of Stock'}</span></p>

        //                     <hr />

        //                     <h4 className="mt-2">Description:</h4>
        //                     <p>{product?.product?.description}</p>
        //                     <hr />
        //                     <p id="product_seller mb-3">Sold by: <strong>{product?.product?.seller}</strong></p>

        //                     <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
        //                         Submit Your Review
        //                     </button>

        //                     <div className="row mt-2 mb-5">
        //                         <div className="rating w-50">

        //                             <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
        //                                 <div className="modal-dialog" role="document">
        //                                     <div className="modal-content">
        //                                         <div className="modal-header">
        //                                             <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
        //                                             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        //                                                 <span aria-hidden="true">&times;</span>
        //                                             </button>
        //                                         </div>
        //                                         <div className="modal-body">

        //                                             <ul className="stars" >
        //                                                 <li className="star"><i className="fa fa-star"></i></li>
        //                                                 <li className="star"><i className="fa fa-star"></i></li>
        //                                                 <li className="star"><i className="fa fa-star"></i></li>
        //                                                 <li className="star"><i className="fa fa-star"></i></li>
        //                                                 <li className="star"><i className="fa fa-star"></i></li>
        //                                             </ul>

        //                                             <textarea name="review" id="review" className="form-control mt-3">

        //                                             </textarea>

        //                                             <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>

        //                         </div>

        //                     </div>
        //                 </div >
        //             </div >
        //         </Fragment>
        //     )}
        // </Fragment>







        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product?.product?.name} />
                    {console.log("nameeeeeeeeeeeeeeeeee",product?.product?.name)}
                    <div className="row d-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                        { console.log( product.product )}
                             <Carousel pause='hover'>
                                { product?.product?.images?.map(image =>(
                                    <Carousel.Item key={image.pubic_id}>
                                        <img className="d-block w-100" src={image.url} alt={product.title} />
                                    </Carousel.Item> 
                                    ))}
                                    
                                    
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product?.product?.name}</h3>
                            <p id="product_id">Product # {product?.product?._id}</p>

                            <hr />

                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(product?.product?.ratings / 5) * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product?.product?.numOfReviews} Reviews)</span>

                            <hr />

                            <p id="product_price">${product?.product?.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                            </div>
                            <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product?.product?.stock === 0} onClick={addToCart}>Add to Cart</button>

                            <hr />

                            <p>Status: <span id="stock_status" className={product?.product?.stock > 0 ? 'greenColor' : 'redColor'} >{product?.product?.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>{product?.product?.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>{product?.product?.seller}</strong></p>

                            {/* {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings}>
                                Submit Your Review
                            </button>
                                :
                                <div className="alert alert-danger mt-5" type='alert'>Login to post your review.</div>
                            } */}


                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">

                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">

                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea
                                                        name="review"
                                                        id="review" className="form-control mt-3"
                                                        // value={comment}
                                                        // onChange={(e) => setComment(e.target.value)}
                                                    >

                                                    </textarea>

                                                    <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* {product.reviews && product.reviews.length > 0 && (
                        <ListReviews reviews={product.reviews} />
                    )} */}

                </Fragment>
            )}
        </Fragment>






    )
}


export default ProductDetails;