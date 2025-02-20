'use client'

import { BuilderContent, useIsPreviewing } from '@builder.io/react'
import { builder } from '@builder.io/sdk'
import Image from 'next/image'
import builderConfig from '@config/builder'

builder.init(builderConfig.apiKey)

interface EventProps {
  content: any
  locale: string
}

const Event: React.FC<EventProps> = ({ content, locale }) => {
  const isPreviewing = useIsPreviewing()

  return (
    <BuilderContent model="page" content={content}>
      {(data, loading, content) => {
        if (!isPreviewing && content?.data?.title) {
          console.log(window.location.href);
        }

        return (
          <section className="relative bg-lavender-tint-1 pt-4xl pb-xl">
            <div className="container">
              <div className="flex gap-md tablet:gap-xl flex-col desktop-s:flex-row">
                <h5>{content?.data?.title}</h5>
              </div>
            </div>
          </section>
        )
      }}
    </BuilderContent>
  )
}

export default Event
