import css from './PromotersMatrixBox.module.css'

export interface categorySchema{
    BZType: string;
    GroupType: string;
    ProductGrp: string;
    MainSKU: string;
    Replacement: string;
}

// export interface MatrixDataItem{
//   region: string;
//   account: string;
//   categories: categorySchema[];
// }

export interface PromotersMatrixBoxProps{
        matrixData: categorySchema[];
        sessionCategory: string;
}

export default function PromotersMatrixBox({ matrixData, sessionCategory }: PromotersMatrixBoxProps){

const filteredCategories = matrixData.filter(item => item.GroupType === sessionCategory);
console.log('XXX PromotersMatrixBox newArray', filteredCategories);
    console.log('XXX PromotersMatrixBox matrixData',matrixData);

    return<>
        <div className={css.tableWrapper}>
            <table className={css.table}>
                <thead>
                    <tr >
                        <th>#</th>
                        <th>Group</th>
                        <th>Main SKU</th>
                        <th>Replacement</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCategories.map((item, index) => (
                            <tr key={index} >
                                <td >{item.BZType}</td>
                                <td >{item.ProductGrp}</td>
                                <td >{item.MainSKU}</td>
                                <td >{item.Replacement}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    
    </>
}