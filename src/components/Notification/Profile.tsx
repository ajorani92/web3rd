import { Notification } from '@generated/types'
import { BadgeCheckIcon } from '@heroicons/react/solid'
import formatAddress from '@lib/formatAddress'
import getAvatar from '@lib/getAvatar'
import imagekitURL from '@lib/imagekitURL'
import isVerified from '@lib/isVerified'
import Link from 'next/link'
import React, { FC } from 'react'
import { POLYGONSCAN_URL } from 'src/constants'

interface Props {
  notification: Notification
}

export const NotificationProfileAvatar: FC<Props> = ({ notification }) => {
  const { wallet }: any = notification
  const picture = wallet
    ? wallet?.defaultProfile?.picture
      ? getAvatar(wallet?.defaultProfile)
      : imagekitURL(`https://avatar.tobi.sh/${wallet?.address}.png`, 'avatar')
    : // @ts-ignore
    notification?.profile?.picture
    ? // @ts-ignore
      getAvatar(notification?.profile)
    : imagekitURL(
        // @ts-ignore
        `https://avatar.tobi.sh/${notification?.profile?.ownedBy}.png`,
        'avatar'
      )

  const profile = wallet
    ? wallet?.defaultProfile
      ? {
          url: `/u/${wallet?.defaultProfile?.handle}`,
          target: '_self',
          alt: wallet?.defaultProfile?.handle
        }
      : {
          url: `${POLYGONSCAN_URL}/address/${wallet?.address}`,
          target: '_blank',
          alt: wallet?.address
        }
    : {
        // @ts-ignore
        url: `/u/${notification?.profile?.handle}`,
        target: '_self',
        // @ts-ignore
        alt: notification?.profile?.handle
      }

  return (
    <Link href={profile.url}>
      <a href={profile.url} target={profile.target}>
        <img
          src={picture}
          className="w-10 h-10 bg-gray-200 rounded-full border dark:border-gray-700/80"
          alt={profile.alt}
        />
      </a>
    </Link>
  )
}

export const NotificationProfileName: FC<Props> = ({ notification }) => {
  const { wallet }: any = notification
  const profile = wallet
    ? wallet?.defaultProfile
      ? {
          name: wallet?.defaultProfile?.name ?? wallet?.defaultProfile?.handle,
          url: `/u/${wallet?.defaultProfile?.handle}`,
          target: '_self'
        }
      : {
          name: formatAddress(wallet?.address),
          url: `${POLYGONSCAN_URL}/address/${wallet?.address}`,
          target: '_blank'
        }
    : {
        // @ts-ignore
        name: notification?.profile?.name ?? notification?.profile?.handle,
        // @ts-ignore
        url: `/u/${notification?.profile?.handle}`,
        target: '_self'
      }

  return (
    <Link href={profile.url}>
      <a
        href={profile.url}
        className="inline-flex items-center space-x-1 font-bold"
        target={profile.target}
      >
        <div>{profile.name}</div>
        {isVerified(wallet?.defaultProfile?.id) && (
          <BadgeCheckIcon className="w-4 h-4 text-brand-500" />
        )}
      </a>
    </Link>
  )
}
