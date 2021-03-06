import React from 'react'
import { Card } from 'components/blocks'
import { toggleTokenRevealModal } from '@actions'
import { useDispatch } from 'react-redux'
import { getUser } from 'utils'
import { SignOutIcon } from 'components/vectors'

const UserCard = () => {
  const dispatch = useDispatch()
  const toggleModal = (value) => dispatch(toggleTokenRevealModal(value))
  const user = getUser()
  return (
    <div className="mb-4">
      <Card>
        <div>
          <div className="w-full px-3 py-2 border-b-2 border-gray-700 mb-2 flex flex-row justify-between items-center">
            <h6 className="text-lg text-white">Hi {user ? user.name : 'SafeSpace' },</h6>
          </div>
          <div className="flex flex-row items-center justify-between px-3 py-4">
            <div className="button button--primary" onClick={() => { toggleModal(true) }}> Reveal Data </div>
            <div className="ml-3">
                <SignOutIcon width={24} height={24} fill="#fff" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default UserCard
