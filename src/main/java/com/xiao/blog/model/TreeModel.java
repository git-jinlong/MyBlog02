package com.xiao.blog.model;

import lombok.Data;

import java.util.List;

/**
 * @author wangmx
 * @create 2019-11-24 21:58
 * @Desc
 */
@Data
public class TreeModel {

    private Integer id;

    private String title;

    private boolean checked;

    private List<TreeModel> children;


    public void setChecked(){
        checked = true;
    }
}
