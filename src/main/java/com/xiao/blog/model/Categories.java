package com.xiao.blog.model;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class Categories implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer id;

    private String name;

    private String icon;

    private String createDate;

    private String updateDate;

    private Integer userId;

    public Categories(){}

    public Categories(Integer  userId){
        this.userId = userId;
    }
}