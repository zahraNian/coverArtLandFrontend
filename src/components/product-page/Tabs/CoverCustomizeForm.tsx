import InputGroup from "@/components/ui/input-group";
import { ToggleSwitch } from "@/components/ui/toggleSwitch";
import { useState } from "react";

const CoverCustomizeForm = () => {
    const [checked, setChecked] = useState(false);
    return (
        <div className="flex flex-col">
            <span className="text-xl text-gray-700 font-semibold">Customize Your Design</span>
            <span className="text-gray-500 mt-1 mb-6">Add your own text and select additional options to personalize this design</span>
            <div className="flex flex-col xl:flex-row gap-y-3 w-full justify-between">
                <div className="xl:w-[47%] flex flex-col gap-y-3">
                    <InputGroup className="flex flex-col w-full items-start pl-0">
                        <InputGroup.Text>
                            Song Title
                        </InputGroup.Text>
                        <InputGroup.Input
                            type="text"
                            name="title"
                            placeholder="Enter your song title"
                            className="rounded-lg px-3 bg-gray-50"
                        />
                    </InputGroup>
                    <InputGroup className="flex flex-col w-full items-start pl-0">
                        <InputGroup.Text>
                            Artist/Singer Name
                        </InputGroup.Text>
                        <InputGroup.Input
                            type="text"
                            name="artist"
                            placeholder="Enter artist name"
                            className="rounded-lg px-3 bg-gray-50"
                        />
                    </InputGroup>
                    <InputGroup className="flex flex-col w-full items-start pl-0">
                        <InputGroup.Text>
                            Additional Information
                        </InputGroup.Text>
                        <InputGroup.Input
                            type="text"
                            name="additional"
                            placeholder="Any special requests or additional information..."
                            className="rounded-lg px-3 bg-gray-50"
                        />
                    </InputGroup>
                </div>
                <div className="xl:w-[47%] flex flex-col gap-y-3">
                    <ToggleSwitch
                        checked={checked}
                        onCheckedChange={(newState) => {
                            setChecked(newState);
                        }}
                        label="YouTube Cover Option"
                        className="w-full flex justify-between"
                    />
                    <ToggleSwitch
                        checked={checked}
                        onCheckedChange={(newState) => {
                            setChecked(newState);
                        }}
                        label="Animated Cover Art"
                        className="w-full flex justify-between"
                    />
                    <ToggleSwitch
                        checked={checked}
                        onCheckedChange={(newState) => {
                            setChecked(newState);
                        }}
                        label="Parental Advisory"
                        className="w-full flex justify-between"
                    />
                </div>
            </div>
        </div>
    )
}
export default CoverCustomizeForm;