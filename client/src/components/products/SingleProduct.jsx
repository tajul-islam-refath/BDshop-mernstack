import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'

import { addToCartItem } from '../../store/actions/cartActions'
import { getSingleProduct, clearError } from '../../store/actions/productActions'
import Loader from '../layouts/Loader/Loader'
import MetaData from '../layouts/MetaData'
import ProductRating from './ProductRating'


const SingleProduct = ({ match, history }) => {
    const { id } = match.params

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState("")


    const dispatch = useDispatch()
    const alert = useAlert()


    const { isAuthenticated } = useSelector(state => state.auth)
    const { product, loading, error } = useSelector(state => state.singleProduct)


    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

    }, [error, dispatch])

    useEffect(() => {
        dispatch(getSingleProduct(id))
    }, [])

    return (
        <Fragment>
            {loading ? <Loader />
                : Object.keys(product).length !== 0 ? (
                    (
                        <Fragment>
                            <MetaData title={`Product - ${product.name}`} />
                            <div>
                                <Link className='btn btn-light my-3' to='/'>
                                    Go Back
                                 </Link>
                                <Row>
                                    <Col className="col-12 col-md-3">
                                        <Image src={product.images[0].url} alt={product.name} fluid />
                                    </Col>
                                    <Col className="col-12 col-md-6">
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <h3>{product.name}</h3>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <ProductRating
                                                    value={product.ratings}
                                                    text={`${product.numOfReviews} reviews`}
                                                />
                                            </ListGroup.Item>
                                            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                                            <ListGroup.Item>
                                                Description: {product.description}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                    <Col className="col-12 col-md-3">
                                        <Card>
                                            <ListGroup variant='flush'>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Price:</Col>
                                                        <Col>
                                                            <strong>${product.price}</strong>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>

                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Status:</Col>
                                                        <Col className={product.stock > 0 ? "text-success" : "text-danger"} >
                                                            {product.stock > 0 ? 'In Stock' : 'Out Of Stock'}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>

                                                {product.stock > 0 && (
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Qty</Col>
                                                            <Col>
                                                                <Form.Control
                                                                    as='select'
                                                                    value={qty}
                                                                    onChange={(e) => setQty(e.target.value)}
                                                                >
                                                                    {[...Array(product.stock).keys()].map(
                                                                        (x) => (
                                                                            <option key={x + 1} value={x + 1}>
                                                                                {x + 1}
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </Form.Control>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                )}

                                                <ListGroup.Item>
                                                    <Button
                                                        onClick={() => dispatch(addToCartItem(product._id, qty))}
                                                        className='btn-block'
                                                        type='submit'
                                                        disabled={product.stock === 0}
                                                    >
                                                        Add To Cart
                                                    </Button>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card>
                                    </Col>
                                </Row>

                                {/* Reviews section*/}
                                <Row>
                                    <Col className="col-12  col-md-6" >
                                        <h2>Reviews</h2>
                                        <ListGroup variant='flush'>
                                            {product.reviews.length === 0 ? <h2>No Reviews</h2> : (
                                                <>
                                                    {product.reviews.map((review) => (
                                                        <ListGroup.Item key={review._id}>
                                                            <strong>{review.name}</strong>
                                                            <ProductRating value={review.rating} />
                                                            <p>{review.createdAt.substring(0, 10)}</p>
                                                            <p>{review.comment}</p>
                                                        </ListGroup.Item>
                                                    ))}
                                                </>
                                            )}

                                            <ListGroup.Item>

                                                {/* <h2>Write a Customer Review</h2>
                                                {successProductReview && (
                                                    <Message variant='success'>
                                                        Review submitted successfully
                                                    </Message>
                                                )}
                                                {loadingProductReview && <Loader />}
                                                {errorProductReview && (
                                                    <Message variant='danger'>{errorProductReview}</Message>
                                                )} */}
                                                {isAuthenticated ? (
                                                    <Form >
                                                        <h2>Write a Customer Review</h2>
                                                        <Form.Group controlId='rating'>
                                                            <Form.Label>Rating</Form.Label>
                                                            <Form.Control
                                                                as='select'
                                                                value={rating}
                                                                onChange={(e) => setRating(e.target.value)}
                                                            >
                                                                <option value=''>Select...</option>
                                                                <option value='1'>1 - Poor</option>
                                                                <option value='2'>2 - Fair</option>
                                                                <option value='3'>3 - Good</option>
                                                                <option value='4'>4 - Very Good</option>
                                                                <option value='5'>5 - Excellent</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                        <Form.Group controlId='comment'>
                                                            <Form.Label>Comment</Form.Label>
                                                            <Form.Control
                                                                as='textarea'
                                                                row='3'
                                                                value={comment}
                                                                onChange={(e) => setComment(e.target.value)}
                                                            ></Form.Control>
                                                        </Form.Group>
                                                        <Button
                                                            // disabled={loadingProductReview}
                                                            type='submit'
                                                            variant='primary'
                                                        >
                                                            Submit
                                                       </Button>
                                                    </Form>
                                                ) : (
                                                    <>
                                                        Please <Link to='/login'>sign in</Link> to write a review{' '}
                                                    </>
                                                )}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </div>
                        </Fragment>
                    )
                ) : (
                    <Fragment>
                        <div className=" text-center card card-body my-4" >
                            <h3>Product Not Found</h3>
                        </div>
                    </Fragment>
                )}
        </Fragment>
    );
}

export default SingleProduct;