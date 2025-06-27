import ButtonBox from "@/components/ButtonBox/ButtonBox";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import TopBonusList from "@/components/TopBonusList/TopBonusList";

export default function UserTopBonusPage(){
    return(<>
        <ComponentWrapper title="Top Bonus list">
<TopBonusList/>

        </ComponentWrapper>
<ButtonBox option="link" href="/user/plans/" >Back</ButtonBox>
</>    )
}