import { useState, useEffect } from 'react'
import { Card, Comments, OtherReviewItem, CommentForm, Progress, ErrorBoundary, CompanyPill } from 'components/blocks'
import DefaultLayout from 'components/layout/DefaultLayout'
import { getKey, urlify, getUrlFromText, removeUrl } from 'utils'
import HeadShake from 'react-reveal/HeadShake'
import Slide from 'react-reveal/Slide'
import APIClient from 'utils/APIClient'
import PropTypes from 'prop-types'
import moment from 'moment'
// import URLTAG from 'blocks/URL'
import {useRouter} from 'next/router'
import { IDLE, STARTED, RESOLVED, REJECTED } from '@constants'

const Review = () => {
  const {query} = useRouter();
  const [review, reviewSet] = useState({});
  const [otherReviews, otherReviewsSet] = useState([]);
  const [loading, loadingSet] = useState(true);
  const [fetchReviewStatus, setFetchReviewStatus] = useState(IDLE);

  useEffect(() => {
    if(query.id){
      setFetchReviewStatus(STARTED);
      APIClient.get(`reviews/${query.id}`)
      .then( response => {
        reviewSet(response.data.data)
        setFetchReviewStatus(RESOLVED)
      })
      .catch( err => {
        setFetchReviewStatus(REJECTED)
      })
    }
    // return () => {    }
  }, [query.id])

  useEffect(() => {
    const page = {
      size: '10',
      page: '1'
    }

    APIClient.get(`reviews/${page.size}/${page.page}`)
      .then(response => {
        loadingSet(false)
        if (response.data.statusCode === 200) {
          otherReviewsSet(response.data.data.reviews)
        }
      })
      // eslint-disable-next-line handle-callback-err
      .catch(error => {
        loadingSet(false)
      })
  }, [])

  const getLinks = (review) => {
    return Array.from(review.review).map( node => getUrlFromText(node)).filter( x => {if(x) return x;}).flat();
  };

  return (
    <DefaultLayout>
      <main className="w-screen pt-5 pb-16 px-4 xl:px-0">
        <div className="sm:max-w-full mx-auto md:max-w-screen-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
            <div className="col-span-2">
              <div>
                { fetchReviewStatus === IDLE || fetchReviewStatus === STARTED  && <Progress />}
                { fetchReviewStatus === REJECTED && <ErrorBoundary message="Review not found"/>}
                {
                  fetchReviewStatus === RESOLVED && (
                    <Card>
                      <div className="p-4">
                        {
                            review.review && review.review.map((node, index) => (
                              <div key={getKey()}>
                                <Slide top>
                                  <>
                                    <p className="text-white text-base white-space break-words">{removeUrl(node)}</p>
                                  </>
                                </Slide>
                                {
                                  (index !== 0 && index !== (review.review.length - 1)) && (
                                    <Slide top>
                                      <div className="h-6 w-px bg-green-600"></div>
                                    </Slide>
                                  )
                                }
                              </div>
                            ))
                          }

                        {
                          getLinks(review).length > 0 && (
                            <div>
                              <h6 className="text-lg text-white">Links</h6>
                                <ul>
                                  {
                                    getLinks(review).map( link => (
                                      <li key={getKey()}>
                                        <a href={link} className="text-sm text-gray-300 break-words underline">{link}</a>
                                      </li>
                                    ))
                                  }
                                </ul>
                            </div>
                          )
                        }

                      </div>
                    </Card>
                  )
                }
                {
                  fetchReviewStatus === RESOLVED && (
                    <div className="flex flex-row justify-between mt-2">
                      <div>
                        <CompanyPill name={review.company.name} />
                        <Slide top>
                          <p className="text-white text-sm font-bold mt-2"><span className="text-xs font-normal">by</span> {review.user.name}</p>
                        </Slide>
                      </div>
                      <div>
                        <Slide bottom>
                          <span className="block text-white text-sm">{moment(review.createdAt).format('ddd, MMM Do YYYY hh:mm a')}</span>
                        </Slide>
                      </div>
                    </div>
                  )
                }
              </div>
              <div className="mt-6">
                {fetchReviewStatus === RESOLVED && (<CommentForm reviewId={review._id} />)}
              </div>

              <div className="mt-6">
              {fetchReviewStatus === RESOLVED && (<Comments reviewId={review._id} />)}
              </div>
            </div>
            <div className="col-span-1 mt-4 md:mt-0">
            { loading && <Progress />}
            
              {
                !loading && (
                    <Card>
                      <div className="">
                        <div className="w-full px-3 py-2 border-b-2 border-gray-700 mb-2 flex flex-row justify-between items-center">
                          <HeadShake>
                            <h6 className="text-lg text-white">Other Reviews</h6>
                          </HeadShake>
                        </div>
                        <div className="px-3 py-3">
                          <ul>
                            { otherReviews && otherReviews.length > 0 && (
                              otherReviews.filter(otherReview => otherReview._id !== review._id).map(review => <OtherReviewItem key={getKey()} review={review} />)
                            )}
                          </ul>
                          { !otherReviews && <ErrorBoundary message="Problem establishing connection" />}
                          { otherReviews && otherReviews.length < 1 && <ErrorBoundary message="No Reviews" />}

                        </div>

                      </div>
                    </Card>
                )
              }
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  )
}

// export async function getStaticPaths () {
//   const reviewsResource = await APIClient.get('reviews/all')
//   const reviews = await reviewsResource.data.data
//   const paths = reviews.map((review) => ({
//     params: { id: review._id }
//   }))
//   return {
//     paths: paths,
//     fallback: false
//   }
// }

// // This also gets called at build time
// export async function getStaticProps ({ params }) {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   const reviewResource = await APIClient.get(`reviews/${params.id}`)
//   const review = await reviewResource.data.data

//   // Pass post data to the page via props
//   return { props: { review } }
// }

Review.propTypes = {
  // review: PropTypes.shape({
  //   _id: PropTypes.string.isRequired,
  //   review: PropTypes.arrayOf(PropTypes.string.isRequired),
  //   verifiedByUser: true,
  //   verifiedByAdmin: false,
  //   company: PropTypes.shape({
  //     name: PropTypes.string.isRequired
  //   }),
  //   user: PropTypes.shape({
  //     verified: false,
  //     name: PropTypes.string.isRequired,
  //     public_id: PropTypes.string.isRequired,
  //     __v: PropTypes.number.isRequired
  //   }),
  //   createdAt: PropTypes.string.isRequired,
  //   __v: PropTypes.number.isRequired
  // })
}
export default Review
