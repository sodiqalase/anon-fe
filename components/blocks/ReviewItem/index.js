import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { CommentIcon, MoreCommentIcon, VerifiedIcon } from 'components/vectors'
import PropTypes from 'prop-types'
import Slide from 'react-reveal/Slide'
import moment from 'moment'
import APIClient from 'utils/APIClient'
import { removeUrl } from 'utils'

const ReviewItem = ({ review }) => {
  const isTrending = num => num > 5

  return (
    <div className="border-b-2 last:border-b-0 border-gray-700  py-4 px-3">
      {/* <Slide top> */}
      <div className="flex flex-row items-center">
        <div className="flex flex-col justify-between items-center h-full">
          {
            !isTrending(review.numberOfComment) ? (
              <span className="flex-shrink-0 text-gray-600 text-center my-1">{review.numberOfComment || 0}</span>
            ) : (<div className="my-2">
              <div title="More Comments" className="my-1">
                <MoreCommentIcon width={14} height={22} fill="#fff"/>
              </div>
            </div>)
          }
          <div title="Comments" className="my-1">
            <CommentIcon width={18} height={14} fill="#1f364d" />
          </div>
          { review.verifiedByUser && (
            <div title="Verified Review" className="my-1">
              <VerifiedIcon width={18} height={14} fill="#fff" />
            </div>
          )}
        </div>
        <div className="flex flex-col ml-4" style={{width: '90%'}}>
          <div>
            <Link href={`/reviews/${review._id}`}>
              <a className="text-gray-100 mb-1 hover:font-semibold cursor-pointer visited:text-red-600 break-words">
                {review.review && removeUrl(review.review[0])}
              </a>
            </Link>
          </div>
          <div className="flex flex-row items-center justify-between mt-2">
            <p className="text-gray-600"><span className="text-sm">posted by</span> {review.user.name}</p>
            <span className="text-sm text-teal-300">{moment(review.createdAt).format('ddd, MMM Do YYYY hh:mm a')}</span>
          </div>
        </div>
      </div>
      {/* </Slide> */}
    </div>
  )
}

ReviewItem.propTypes = {
  review: PropTypes.shape(
    {
      _id: PropTypes.string.isRequired,
      review: PropTypes.arrayOf(PropTypes.string.isRequired),
      verifiedByUser: PropTypes.bool.isRequired,
      verifiedByAdmin: PropTypes.bool.isRequired,
      numberOfComment: PropTypes.number,
      company: {
        name: PropTypes.string.isRequired
      },
      user: {
        verified: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        public_id: PropTypes.string.isRequired,
        __v: PropTypes.number
      },
      createdAt: PropTypes.string.isRequired,
      __v: PropTypes.number
    }
  ).isRequired
}

export default ReviewItem
