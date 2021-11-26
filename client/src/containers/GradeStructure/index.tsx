import { Button, Card, CardContent, Grid, ListItemText, TextField, Typography, ListItem } from '@material-ui/core';
import { Add, Delete, Edit, Save } from '@material-ui/icons';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./index.scss";



interface IDrageAttribute {
    id: string;
    content: string;
    description: string;
    grade: number;
}
const fakeData = (count: number) => {
    return {
        id: `item-${count}`,
        content: `item ${count}`,
        grade: count,
        description: `item ${count}`
    }
}

// fake data generator
const getItems = (count: number): IDrageAttribute[] => {
    return Array.from({ length: count }, (v, k) => k).map(k => (fakeData(k)));
}
// a little function to help us with reordering the result
const reorder = (list: IDrageAttribute[], startIndex: number, endIndex: number): IDrageAttribute[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 3;

const getDisableList = (count: number): boolean[] => {
    return new Array(count).fill(true);
}


const GradeStructure = () => {
    const [itemList, setItemList] = useState(getItems(3));
    const [isDisableList, setIsDisableList] = useState(getDisableList(3));
    const [chooseIndex, setChooseIndex] = useState<number>(0);
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            itemList,
            result.source.index,
            result.destination.index
        );

        setItemList(items);
    }

    const handleChangeEvent = () => {
        let newDisableList = [...isDisableList];
        newDisableList[chooseIndex] = !newDisableList[chooseIndex];
        setIsDisableList(newDisableList);
    }

    const handleAddDrag = () => {
        let newItemList = [...itemList];
        newItemList.push(fakeData(itemList.length));
        setItemList(newItemList);

        setChooseIndex(itemList.length);
    }

    return (
        <div className="structure-main">
            <Card className="structure-main___title">
                <Typography variant="h4" component="div" className="structure-main___title--class-name">
                    Lap tring ung dung web - 18 - 3
                </Typography>
                <CardContent>

                    <Grid container spacing={2} className="structure-main___content--structure">
                        <Grid xs={6}>
                            <p className="structure-main___content--structure--header">Loại điểm</p>
                        </Grid>
                        <Grid xs={6} >
                            <p className="structure-main___content--structure--header">Thang điểm</p></Grid>

                        {itemList.map((item) => (
                            <>
                                <Grid xs={6}>{item.content}</Grid>
                                <Grid xs={6}>{item.grade}</Grid>
                            </>
                        ))}

                    </Grid>
                    <div className="structure-main___content--structure--total" >
                        Tổng cộng: {itemList.reduce((a, b) => a + b.grade, 0 )} điểm
                    </div>
                </CardContent>
            </Card>

            <Card className="structure-main___drag">
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="structure-main___drag___list-show"

                                    >
                                        {itemList.map((item, index) => (
                                            <Button
                                                fullWidth
                                                style={{ padding: '0px' }}
                                                onClick={() => {
                                                    setChooseIndex(Number(item.id.split('-')[1]));
                                                }}
                                            >
                                                <Draggable

                                                    key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`structure-main___drag___list-show--item${`item-${chooseIndex}` === item.id ? " structure-main___drag___list-show--item--click" : ""}`}

                                                        >
                                                            {item.content}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            </Button>
                                        ))}
                                        {provided.placeholder}
                                    </div>

                                )}

                            </Droppable>
                            <Button className="structure-main___drag--add-more"
                                style={{ backgroundColor: "rgb(151, 151, 151)" }}
                                onClick={handleAddDrag}>
                                <Add />
                            </Button>
                        </DragDropContext>
                    </Grid>
                    <Grid item xs={8}>
                        <Card className="structure-main___drag___description">
                            <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
                                Thông tin về loại cấu trúc điểm
                            </Typography>
                            <TextField
                                fullWidth
                                label="Tên loại điểm"
                                defaultValue={itemList[chooseIndex].content}
                                disabled={isDisableList[chooseIndex]}
                                variant={`${!isDisableList[chooseIndex] ? "standard" : "filled"}`}
                            />
                            <TextField
                                fullWidth
                                label="Số điểm"
                                defaultValue={itemList[chooseIndex].grade}
                                disabled={isDisableList[chooseIndex]}
                                variant={`${!isDisableList[chooseIndex] ? "standard" : "filled"}`}
                            />
                            <TextField
                                fullWidth
                                label="Mô tả về loại điểm này"
                                defaultValue={itemList[chooseIndex].description}
                                disabled={isDisableList[chooseIndex]}
                                variant={`${!isDisableList[chooseIndex] ? "standard" : "filled"}`}
                            />
                            <div className="structure-main___drag___description--update">
                                <Button variant="outlined" startIcon={<Delete />} style={{ color: "white", backgroundColor: "rgb(248, 44, 44)" }}>
                                    Xóa
                                </Button>
                                {
                                    isDisableList[chooseIndex] ?
                                        <Button
                                            onClick={handleChangeEvent}
                                            variant="outlined" startIcon={<Edit />} style={{ color: "white", backgroundColor: "green" }}>
                                            Chỉnh sửa
                                        </Button>
                                        :
                                        <Button
                                            onClick={handleChangeEvent}
                                            variant="outlined" startIcon={<Save />} style={{ color: "white", backgroundColor: "blue" }}>
                                            Lưu
                                        </Button>
                                }
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default GradeStructure;