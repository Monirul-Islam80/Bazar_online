import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getProducts } from '../../actions/productsActon';
import ProductCard from '../Home/ProductCard';
import Loader from '../layout/loader/Loader';
import './products.css';
import Pagination from 'react-js-pagination';
import Slider from '@mui/material/Slider'
import { Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
const categories = [
    "Laptop",
    "Footwear",
    "Bootom",
    "Tops",
    "Attire",
    "Camera",
    "Mobile"
]
const Products = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
    const [currentPage, setcurrentPage] = useState(1);
    const keyword = match.params.keyword;
    const [price, setprice] = useState([0, 25000]);
    const [category, setcategory] = useState("");
    const [Rating, setRating] = useState(0);

    const setcurrentPageNo = (e) => {
        setcurrentPage(e)
    };
    const priceHandler = (event, newPrice) => {
        setprice(newPrice);
    };
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        dispatch(getProducts(keyword, currentPage, price, category, Rating));

    }, [dispatch, keyword, currentPage, price, category, Rating, alert, error]);
    let count = filteredProductsCount;
    return <>

        {loading ? <Loader /> :
            (
                <>
                <MetaData title="PRODUCTS -- BAZAR"/>
                    <h2 className="prhead">Products</h2>
                    <div className="products">
                        {
                            products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        }
                    </div>
                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            size='small'
                            onChange={priceHandler}
                            valueLabelDisplay='auto'
                            aria-labelledby='range-slider'
                            min={0}
                            max={25000}
                        />
                        <Typography>Categories</Typography>
                        <ul>
                            {
                                categories.map((category) => (
                                    <li
                                        className='category_link'
                                        key={category}
                                        onClick={() => setcategory(category.toLowerCase())}
                                    >{category}</li>
                                ))
                            }
                        </ul>
                        <fieldset>
                            <Typography component='legend' className='legends'>Ratings_Above</Typography>
                            <Slider
                                value={Rating}
                                size='small'
                                onChange={(e, newRating) => {
                                    setRating(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                min={0}
                                max={5}
                                valueLabelDisplay='auto'
                            />
                        </fieldset>
                    </div>


                    {resultPerPage < count && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setcurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="First"
                                lastPageText="Last"
                                itemClass='page_item'
                                linkClass='page_link'
                                activeClass='pageItemActive'
                                activeLinkClass='pageLinkActive'
                            />
                        </div>
                    )}
                </>
            )
        }
    </>;
};

export default Products;
