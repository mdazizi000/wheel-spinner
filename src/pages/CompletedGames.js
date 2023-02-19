import {Fragment} from "react";
import {Badge, Card, CardBody, CardHeader, Table} from "reactstrap";


const CompletedGames = () => {
  return(
      <Fragment>
        <Card>
            <CardHeader>
                <h4>تاریخچه  بازی ها</h4>
            </CardHeader>
            <CardBody>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>نام بازی</th>
                        <th>مبلغ(دلار)</th>
                        <th>تعداد نفرات</th>
                        <th>تاریخ ایجاد</th>
                        <th>تاریخ اتمام</th>
                        <th>وضعیت</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>رفقای خوب</td>
                        <td>20</td>
                        <td>5 نفر</td>
                        <td>1401/11/19</td>
                        <td>1401/11/20</td>
                        <td><Badge color={'danger'}  className={'p-2'}>برنده  نشده ایید</Badge></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>کینکز</td>
                        <td>57</td>
                        <td>12 نفر</td>
                        <td>1401/10/05</td>
                        <td>1401/10/08</td>
                        <td><Badge color={'success'}  className={'p-2'}>برنده  شده ایید</Badge></td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>دورهمی</td>
                        <td>100</td>
                        <td>10 نفر</td>
                        <td>1401/09/20</td>
                        <td>1401/09/28</td>
                        <td><Badge color={'success'} className={'p-2'}>برنده  شده ایید</Badge></td>
                    </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card>
      </Fragment>
  )
}

export  default CompletedGames