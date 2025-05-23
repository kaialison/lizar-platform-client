import HomePage from "@/templates/HomePage";
import { makeSrsRequest } from "./makeSrsRequest";
import { API_PATHS } from "@/constants/apis";
import { PAGINATION_PARAMS } from "@/constants";
import Layout from "@/components/layouts/layout";
export default async function Home() {

  const params = {
    ...PAGINATION_PARAMS,
  };
  let locationRes = [];
  const response = await makeSrsRequest({
    path: API_PATHS.LOCATION.GET_LOCATION,
    method: "GET",
    params: params,
  });
  locationRes = response?.result;
  return (
    <Layout>
          <HomePage location={locationRes} />
    </Layout>
  );
}
