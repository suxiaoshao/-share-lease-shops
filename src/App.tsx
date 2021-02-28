import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MyThemeProvider } from './components/myTheme';
import HomePage from './views/homePage';
import ShopSetting from './views/shopSetting';
import GoodSetting from './views/goodsSetting';

/**
 * 应用主页,设置路由
 * */
function App(): JSX.Element {
  return (
    <Router>
      <MyThemeProvider>
        <Switch>
          <Route path={'/'} exact>
            <HomePage />
          </Route>
          <Route path="/setting" exact>
            <ShopSetting />
          </Route>
          <Route path={'/goods'} exact>
            <GoodSetting />
          </Route>
        </Switch>
      </MyThemeProvider>
    </Router>
  );
}

export default App;
