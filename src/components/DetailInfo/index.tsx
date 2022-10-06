import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { ThemeDetailRes, ThemeDetail } from '../../interface';

import GoBack from './GoBack';
import Info from './Info';
import NotFound from '../NotFound';

const DetailInfo = () => {
  const [detailData, setDetailData] = useState<ThemeDetail>();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get<ThemeDetailRes>(`https://api.plkey.app${location.pathname}`);
      setDetailData(data.data);
    })();
  }, []);

  console.log(detailData);

  return (
    <DetailBox>
      <GoBack />
      <Box>{detailData ? <Info detailData={detailData} /> : <NotFound />}</Box>
    </DetailBox>
  );
};

const DetailBox = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
`;

const Box = styled.div`
  width: calc(100% - 32px);
  margin: 57px auto 0 auto;
  /* margin: 0 calc((100% - (100% - 32px))/2); */

  @media screen and (min-width: 500px) {
    margin: 67px auto 0 auto;
  }
`;

export default DetailInfo;
