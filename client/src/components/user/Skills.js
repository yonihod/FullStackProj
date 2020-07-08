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

    return (
        <>
            <div id="auto-suggest">
                <div id="tags">
                    {!!selected &&
                        selected.map(function (tag) {
                            return <Badge className="mr-1 badge" key={tag.label}>{tag.label}</Badge>
                        })
                    }
                </div>
                {!!skills &&
                    <MultiSelect
                        options={skills}
                        hasSelectAll={false}
                        value={selected}
                        onChange={updateUserSkills}
                        labelledBy={"Select"}
                    />
                }
            </div>
        </>
    );
};

export default Skills;