'use client'

import React from 'react';
import {useContext} from "react";
import UserDataContext from "../contexts/userDataContext";

export default function ErrorPage() {


    return (
        <div>
            <h1>Error on module</h1>
            <p>Something went wrong with loading the app module. If this is keeps occurring please report it to the Devs</p>

        </div>
    )
}