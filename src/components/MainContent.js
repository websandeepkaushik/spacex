import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getSpaceXdata } from '../state/SpaceXdata';

/**
 * This the MainContent component
 */
const MainContent = () => {
  const spaceXdata = useSelector(getSpaceXdata);

  const missionIds = (missionIds) => {
    return (missionIds && missionIds.length > 0) && 
            (
            <>
                <b>Mission Ids:</b>
                <ul>
                    {
                        missionIds.map(id => <li key={`mid-${id}`}>{id}</li>)
                    }
                </ul>
            </>
        )
  }
  return (
    <MainContainer>
        <Row>
            {
                spaceXdata?.length > 0 &&
                spaceXdata.map(item => {
                    return (
                        <Col sm={6} md={4} key={`flight-${item.flight_number}`}>
                            <ItemCell>
                                <ItemImg>
                                    <Image src={item.links.mission_patch_small} />
                                </ItemImg>
                                <H3>{`${item.mission_name} #${item.flight_number}`}</H3>
                                {missionIds(item.mission_id)}
                                <b>Launch Year: </b> {item.launch_year}<br />
                                <b>Successful Launch: </b> {item.launch_success}<br />
                                <b>Successful Landing: </b> {'data not in api'}<br />
                            </ItemCell>
                        </Col>
                    )
                })
            }
            
        </Row>
    </MainContainer>
  );
};

export default MainContent;

export const MainContainer = styled.div`
    width: 80%;
    padding-left: 30px;
    @media (max-width: 1024px) {
        .col-sm-6{
            flex: 0 0 50%;
            max-width: 50%;
        }
    }
    @media (max-width: 700px) {
        width: 100%;
        padding-left: 0;
        .col-sm-6{
            flex: 0 0 100%;
            max-width: 100%;
        }
    }
`;

export const ItemCell = styled.div`
    background: #FFF;
    padding: 10px;
    height: 100%;
    border-bottom: 20px solid #CCC;
    img{
        height: 150px;
    }

`;

export const ItemImg = styled.div`
    background: #CCC;
    text-align: center;
    margin-bottom: 10px;
    height: 150px;
`;

export const H3 = styled.h3`
    font-size: 13px;
    font-weight: bold;
    color: #24386e;
`;

export const H4 = styled.h3`
    font-size: 13px;
    font-weight: bold;
`;