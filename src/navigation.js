import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import WebChat from './webchat';

export default function Navigation() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/:helpdesk/:port"
          element={
            <WebChat />
          }
        >
          <Route
            path=""
            element={
              <WebChat />
            }
          />
          <Route
            path=":webchatId"
            element={
              <WebChat />
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <WebChat />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}