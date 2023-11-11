import { Fragment } from "react"

import PublicFooter from "@/components/layouts/public-layout/footer/footer"
import PublicHeader from "@/components/layouts/public-layout/header/header"
import Children from '@/types'

const PublicLayout = ({ children }: Children) => {
  return (
    <Fragment>
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </Fragment>)
}

export default PublicLayout;