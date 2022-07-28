import { Fragment, useContext } from "react";

import { leadContext } from "../../itemlist/itemlist.component";
import { Link } from "react-router-dom";
import "./lead.styles.css";

const Lead = () => {
  const { BreadcrumbsList } = useContext(leadContext);

  return (
    <Fragment>
      <div className="lead">
        <Link className="" to="/">
          ホーム
        </Link>
        {BreadcrumbsList.map((breadcrumb) => {
          let lastName = BreadcrumbsList[BreadcrumbsList.length - 1];
          if (lastName === breadcrumb) {
            return (
              <div key={breadcrumb.categoryId}>
                <span className="leadname"> > </span>
                <span className="leadname">{breadcrumb.categoryName}</span>
              </div>
            );
          }
          return (
            <div key={breadcrumb.categoryId}>
              <span className="leadname"> > </span>
              <Link className="" to={`/itemlist/${breadcrumb.categoryId}`}>
                <span className="leadname">{breadcrumb.categoryName}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
export default Lead;
