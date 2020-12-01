import React from 'react';
import { IRouteComponentProps, NavLink } from 'umi';
import { Switch } from 'react-router';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

type BasicLayoutProps = IRouteComponentProps;

const routeRecord: any = [];

const BasicLayout: React.FC<BasicLayoutProps> = ({
  children,
  location,
  history,
}) => {
  let has = false;
  routeRecord.forEach((ele: any) => {
    if (ele.location.pathname === location.pathname) {
      has = true;
    }
  });

  if (has === false) {
    routeRecord.push({
      location: { ...location },
      child: children.props.children,
      key: location.pathname,
      // .replace('/', '')
    });
  }

  return (
    <>
      <NavLink to="/hello/world">world</NavLink> <br />
      <NavLink to="/hello/demo">hello</NavLink> <br />
      <NavLink to="/">index</NavLink> <br />
      {routeRecord.length > 0 ? (
        <Tabs>
          {routeRecord.map((d: any) => (
            <TabPane tab={d.key} key={d.key}>
              <Switch location={d.location}>{d.child}</Switch>
            </TabPane>
          ))}
        </Tabs>
      ) : (
        ''
      )}
    </>
  );
};

export default BasicLayout;
