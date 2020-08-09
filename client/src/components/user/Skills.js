import React, { useEffect, useState } from "react";
import SkillsService from "../../services/Skills";
import MultiSelect from "react-multi-select-component";
import { Badge } from "react-bootstrap";

const Skills = (props) => {
    const preSelected = props.userSkills.map(function (s) {
        return { label: s.name, value: s._id }
    });

    const [skills, setSkills] = useState([]);
    const [selected, setSelected] = useState(preSelected);

    useEffect(() => {
        SkillsService.getSkills().then(res => {
            if (typeof res !== 'undefined') {
                const selectSkills = res.map(function (skill) {
                    return { label: skill.name, value: skill._id }
                });
                setSkills(selectSkills);
            } else {
                setSkills([]);
            }
        }).catch(err => {
            console.log(err);
        });
    }, [selected]);

    async function updateUserSkills(selectedSkills) {
        setSelected(selectedSkills);
        const skillsIds = selectedSkills.map(x => x.value);
        await SkillsService.setSkills(props.userId, skillsIds);
    }

    const customValueRenderer = (selected, _options) => {
        return selected.length
          ? "Edit Skills"
          : "😶 No Skills Selected";
      };

    return (
        <div>
            <div id="auto-suggest" className={"w-25 p-2"}>
                {!!skills &&
                    <MultiSelect
                        options={skills}
                        hasSelectAll={false}
                        valueRenderer= {customValueRenderer}
                        value={selected}
                        onChange={updateUserSkills}
                        labelledBy={"Select"}
                    />
                }
            </div>
            <div id="tags" className={"d-flex flex-wrap p-2"}>
                {!!selected &&
                selected.map(function (tag) {
                    return <Badge className="mr-1 badge m-1" key={tag.label}>{tag.label}</Badge>
                })
                }
            </div>
        </div>
    );
};

export default Skills;