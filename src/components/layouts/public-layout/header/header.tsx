"use client"

import { Fragment, useState, useEffect } from "react"

import CategoryIcon from '@mui/icons-material/Category';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

import NavLink from "@/components/shares/navlink"

import "./style.scss"
import useFavouriteStore from "@/store/public/favourite";

const PublicHeader = () => {
  const [favouriteTotal, setFavouriteTotal] = useState(0)
  const { data: favouriteData } = useFavouriteStore()
  useEffect(() => {
    setFavouriteTotal(favouriteData.length)
  }, [favouriteData.length])
  return (
    <Fragment>
      <header id="pp__header">
        <div className="container header__container">
          <div>
            <h1>Fakhriddin</h1>
          </div>
          <div className="ph__nav__box">
            <nav>
              <ul className="ph__nav__list">
                <li className="ph__nav__list__item" >
                  <NavLink href="/">
                    <HomeIcon />
                    <p>Asosiy</p>
                  </NavLink>
                </li>
                <li className="ph__nav__list__item" >
                  <NavLink href="/all-products">
                    <CategoryIcon />
                    <p>Barcha mahsulotlar</p>
                  </NavLink>
                </li>
                <li className="ph__nav__list__item" >
                  <NavLink href="/about">
                    <InfoIcon />
                    <p>Biz haqimizda</p>
                  </NavLink>
                </li>
                <li className="ph__nav__list__item" >
                  <NavLink href="/contact">
                    <ContactPhoneIcon />
                    <p>Aloqa</p>
                  </NavLink>
                </li>
                <li className="ph__nav__list__item" >
                  <NavLink href="/cart">
                    <ShoppingCartIcon />
                    <p>Savatcha</p>
                  </NavLink>
                </li>
                <li className="ph__nav__list__item" >
                  <NavLink href="/favourite">
                    <Badge badgeContent={favouriteTotal} color="info">
                      <FavoriteIcon />
                    </Badge>
                    <p>Sevimlilar</p>
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className="ph__account__box">
              <ul className="ph__account__list">
                <li className="ph__account__list__item">
                  <NavLink href="/login">
                    <LockOpenIcon />
                    <p>Kirish</p>
                  </NavLink></li>
                <li className="ph__account__list__item">
                  <NavLink href="/register">
                    <PersonAddAltIcon />
                    <p>Ro'hatdan o'tish</p>
                  </NavLink>
                </li>
              </ul>


            </div>
          </div>
        </div>
      </header>
    </Fragment>

  )
}

export default PublicHeader