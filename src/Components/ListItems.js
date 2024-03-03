import React from "react";
import { Link } from 'react-router-dom';
import { ContainedListItem } from "@carbon/react";
import "../Styles/App.scss";

export default function ListItems(props) {
    const item = props.item;

    return (
        <Link to={`${item.key}`} className="list-items">
            <ContainedListItem>
                <p>
                    {item.title}
                    <span>
                        {(item.author_name !== undefined && item.author_name.length > 0)
                            ? ` by ${JSON.stringify(item.author_name[0])}`
                            : null
                        }
                    </span>
                    <span>
                        {item.first_publish_year !== undefined
                            ? ` (${item.first_publish_year})`
                            : null
                        }
                    </span>
                </p>
            </ContainedListItem>
        </Link>

    );
}