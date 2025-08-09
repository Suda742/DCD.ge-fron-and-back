import { useState } from "react";
import AboutItem from "../Components/AboutItem";

function About() {
    const [openItem, setOpenItem] = useState(null);

    function handleOpenItem(itemNumber) {
        setOpenItem(openItem === itemNumber ? null : itemNumber);
    }

    return (
        <div className="w-full max-w-3xl mx-auto sm:px-6 md:px-8 flex flex-col gap-6">

            <div className="space-y-4">
                <div onClick={() => handleOpenItem(1)}>
                    <AboutItem 
                        question="რა არის DCD ?" 
                        itemNumber={1} 
                        openItem={openItem}
                    >
                        DCD არის ინოვაციური პლატფორმა, რომელიც აკავშირებს პროფესიონალ დისპეჩერებსა და მძღოლებს, რათა მათ შეძლონ უფრო ეფექტური, ორგანიზებული და მომგებიანი თანამშრომლობა. ჩვენი მიზანია სატრანსპორტო ინდუსტრიის გამარტივება, სამუშაო პროცესების ოპტიმიზაცია და სანდო, წარმატებული პარტნიორობის ჩამოყალიბება.
                    </AboutItem>
                </div>
                <div onClick={() => handleOpenItem(2)}>
                    <AboutItem 
                        question="რატომ DCD ?" 
                        itemNumber={2} 
                        openItem={openItem}
                    >
                        DCD-ზე თქვენ შეგიძლიათ მარტივად იპოვოთ გამოცდილ დისპეჩერებთან და მძღოლებთან კავშირი, მიიღოთ საუკეთესო სამუშაო პირობები და განავითაროთ თქვენი კარიერა. ჩვენ ვამაყობთ, რომ ვეხმარებით სატრანსპორტო სექტორში დასაქმებულებს მაქსიმალურად გამოიყენონ თავიანთი შესაძლებლობები და შექმნან მყარი პროფესიული ურთიერთობები.
                    </AboutItem>
                </div>
            </div>
        </div>
    );
}

export default About;
