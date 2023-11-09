import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { GetUser } from 'src/services/action/auth_action'

export const AppSidebarNav = ({ items }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [nav, setNav] = useState([])
  const user = useSelector(st => st.Auth_reducer.user)
  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
          component: NavLink,
        })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  useEffect(() => {
    dispatch(GetUser())
  }, [dispatch])

  useEffect(() => {
    let navItems = []
    if (items?.length && Object.keys(user)?.length) {
      navItems.push(items.filter(e => e.name === 'Գլխավոր')[0])
      if (user?.accessToCategories) {
        navItems.push(items.filter(e => e.name === 'Բաժիններ')[0])
      }
      if (user?.accessToEvents) {
        navItems.push(items.filter(e => e.name === 'Միջոցառումներ')[0])
      }
      if (user?.accessToSessions) {
        navItems.push(items.filter(e => e.name === 'Սեանսներ')[0])
      }
      if (user?.accessToHalls) {
        navItems.push(items.filter(e => e.name === 'Դահլիճներ')[0])
      }
      if (user?.accessToSponsors) {
        navItems.push(items.filter(e => e.name === 'Հովանավորներ')[0])
      }
      if (user?.accessToAds) {
        navItems.push(items.filter(e => e.name === 'Գովազդ')[0])
      }
      if (user?.accessToModerators) {
        navItems.push(items.filter(e => e.name === 'Մոդերատորներ')[0])
      }
      if (user?.accessToFeedback) {
        navItems.push(items.filter(e => e.name === 'Հետադարձ կապ')[0])
      }
      setNav(navItems)
    }
  }, [items, user])

  return (
    <React.Fragment>
      {nav &&
        nav.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
