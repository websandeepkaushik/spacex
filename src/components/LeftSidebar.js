import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/**
 * This the LeftSidebar component
 */
const LeftSidebar = ({location}) => {
  const dispatch = useDispatch();

  const [launchSuccess, setLaunchSuccess] = useState('');
  const [landSuccess, setLandSuccess] = useState('');
  const [launchYear, setLaunchYear] = useState('');
  const filterData = location.search;
  
  useEffect(()=>{
    if(filterData){
        let splitdata = filterData.split('?');
        splitdata = splitdata[1].split('&');
        splitdata.map(data => {
            let keyData = data.split('=');
            switch(keyData[0]){
                case 'launch_success':
                    setLaunchSuccess(keyData[1]);
                    break;
                case 'land_success':
                    setLandSuccess(keyData[1]);
                    break;
                case 'launch_year':
                    setLaunchYear(keyData[1]);
                    break;
                default:
                break;
            }
            return false;
        })
    } else{
        setLaunchSuccess('');
        setLandSuccess('');
        setLaunchYear('');
    }

    dispatch({ type: 'FETCH_SPACEXDATA', payload: filterData });
  }, [dispatch, filterData]);

  const setURL = (key, launchData) => {
    let url = '';
    const state = key === 'launch_success' ? launchSuccess:
                  key === 'land_success' ? landSuccess:
                  launchYear;

    if(filterData){
        if(state){
            if(state === launchData.toString()){
                url = `/${filterData.replace(`${key}=${state}`, '')}`;
            }else{
                url = `/${filterData.replace(`${key}=${state}`, `${key}=${launchData}`)}`;
            }
        }else{
            url = `/${filterData}&${key}=${launchData}`;
        }
    }else{
        if(state){
            url = `/${filterData}&${key}=${launchData}`;
        }else{
            url = `/?${key}=${launchData}`;
        }
    }
    return url;
  }

  const yearList = () => {
      let list = [];
      for(let year = 2006; year <= new Date().getFullYear(); year++){
        list.push(<ListItem key={year}><Link to={setURL('launch_year', year)} className={year.toString() === launchYear ? 'active' : ''}>{year}</Link></ListItem>);
      }
      return list;
  }

  const classSetting = (key, value) => key === value ? 'active' : '';

  return (
    <LeftSidebarSection>
        {filterData && <FilterClear><Link to='/'>Clear</Link></FilterClear>}
        <H2>Filter</H2>
        <FilterBlock>
            <FilterTitle>Launch Year</FilterTitle>
            <List>
                {yearList()}
            </List>
        </FilterBlock>
        <FilterBlock>
            <FilterTitle>Successful Launch</FilterTitle>
            <List>
                <ListItem><Link to={setURL('launch_success', true)} className={classSetting(launchSuccess,'true')}>True</Link></ListItem>
                <ListItem><Link to={setURL('launch_success', false)} className={classSetting(launchSuccess, 'false')}>False</Link></ListItem>
            </List>
        </FilterBlock>
        <FilterBlock>
            <FilterTitle>Successful Landing</FilterTitle>
            <List>
                <ListItem><Link to={setURL('land_success',true)} className={classSetting(landSuccess, 'true')}>True</Link></ListItem>
                <ListItem><Link to={setURL('land_success',false)} className={classSetting(landSuccess, 'false')}>False</Link></ListItem>
            </List>
        </FilterBlock>
    </LeftSidebarSection>
  );
};

export default LeftSidebar;

export const LeftSidebarSection = styled.div`
  font-family: Arial;
  background: #FFF;
  padding: 10px 20px;
  width: 20%;
  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const H2 = styled.h2`
    margin: 0 0 15px 0;
    font-size: 16px;
  `;

export const FilterTitle = styled.h3`
    text-align: center;
    font-size: 14px;
    font-weight: normal;
    border-bottom: 1px solid #CCC;
    padding: 0 0 10px 0;
    margin: 0 0 10px 0;
`;


export const FilterBlock = styled.div`
    margin-bottom: 25px;
`;

export const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
`;

export const ListItem = styled.li`
    float: left;
    clear: both;
    margin: 2px 0;
    &:nth-child(2n+2){
        float: right;
        clear: none;
    }
    a{
        display: block;
        text-decoration: none;
        background: #c3e09b;
        padding: 5px;
        width: 50px;
        text-align: center;
        border-radius: 3px;
        color: #000;
        font-size: 12px;
        &:hover, &.active{
            background: #7cbb05;
        }
    }
`;

export const FilterClear = styled.div`
    float: right;
`;