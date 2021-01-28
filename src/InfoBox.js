import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './infobox.css'

function InfoBox({title,cases,total,onClick,active,isRed}) {
    return (
        <Card onClick={onClick}
         className= {`infoCard ${active && "infobox--selected"}  ${isRed && "infobox--red"}`}  >
                <CardContent>
                {/* TITLE coronavirus cases */}
                <Typography color="textSecondary">
                {title}
                </Typography>
                                
                {/* number of cases  per day */}
                <h2>{cases} </h2>

                
                {/* total */}
                <Typography color="textSecondary">
                {total} total
                </Typography>
                
                </CardContent>
        </Card>
    )
}

export default InfoBox
