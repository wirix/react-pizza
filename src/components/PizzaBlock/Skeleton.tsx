import React, {FC} from "react"
import ContentLoader from "react-content-loader"

const Skeleton: FC = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={490}
    viewBox="0 0 280 530"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="266" rx="10" ry="10" width="280" height="26" />
    <rect x="0" y="311" rx="10" ry="10" width="280" height="88" />
    <circle cx="142" cy="125" r="122" />
    <rect x="0" y="425" rx="10" ry="10" width="91" height="30" />
    <rect x="126" y="417" rx="15" ry="15" width="150" height="46" />
  </ContentLoader>
)

export default Skeleton