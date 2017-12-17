var vm = new Vue({
    el: '#content',
    data: {
        all: 2, //所有目标个数
        completed: 1, //已完成目标个数
        unfinished: 1, //未完成目标个数
        targetName: '', //要添加的目标名称
        allIsSelect: true, //所有目标tab
        comIsSelect: false, //已完成目标tab
        unIsSelect: false, //未完成目标tab
        targetList: [{ //目标列表数据
            name: 'sass',
            status: true,
            id: 0,
            isEdit: false
        }, {
            name: 'vue',
            status: false,
            id: 1,
            isEdit: false
        }]
    },
    watch: {
        /**
         * [targetList 监听列表数据变化]
         * @param  {[type]} newData [变化后的新数据]
         */
        targetList: function(newData) {
            this.target(newData);
        }
    },
    methods: {
        /**
         * [target 过滤目标列表数据]
         * @param  {[type]} data [列表数据]
         * @return {[type]}      [过滤条件]
         */
        target: function(data) {
            var reg = null;
            return data.filter(function(item) {
                // 默认所有目标
                reg = item;
                // 所有目标
                if (vm && vm.allIsSelect) {
                    reg = item;
                }
                // 已完成目标
                if (vm && vm.comIsSelect) {
                    reg = (item.status === true);
                }
                // 未完成目标
                if (vm && vm.unIsSelect) {
                    reg = (item.status === false);
                }
                return reg;
            })
        },
        /**
         * [addTarget 添加目标]
         */
        addTarget: function() {
            if (this.targetName !== '') {
                for (var i = 0; i < this.targetList.length; i++) {
                    // 该目标已存在
                    if (this.targetList[i].name === this.targetName) {
                        alert('该目标已存在！');
                        this.targetName = '';
                        return;
                    }
                }
                this.targetList.push({
                    name: this.targetName,
                    status: false,
                    id: parseInt(Math.random() * 100),
                    isEdit: false
                });
                this.all++;
                this.unfinished++;
                this.targetName = '';
            } else {
                alert('请输入要添加的目标！');
            }
        },
        /**
         * [allTargetFun 切换到所有目标]
         */
        allTargetFun: function() {
            this.allIsSelect = true;
            this.comIsSelect = false;
            this.unIsSelect = false;
        },
        /**
         * [completedFun 切换到已完成目标]
         */
        completedFun: function() {
            this.allIsSelect = false;
            this.comIsSelect = true;
            this.unIsSelect = false;
        },
        /**
         * [unfinishFun 切换到未完成目标]
         */
        unfinishFun: function() {
            this.allIsSelect = false;
            this.comIsSelect = false;
            this.unIsSelect = true;
        },
        /**
         * [chexkBoxFun 勾选操作]
         * @param  {[type]} item [遍历数据项]
         */
        chexkBoxFun: function(item) {
            for (var i = 0; i < this.targetList.length; i++) {
                if (this.targetList[i].id === item.id) {
                    var status = this.targetList[i].status;
                    if (status) {
                        this.targetList[i].status = false;
                        this.completed--;
                        this.unfinished++;
                        return;
                    }
                    this.targetList[i].status = true;
                    this.completed++;
                    this.unfinished--;
                }
            }
        },
        /**
         * [delTargetFun 删除操作]
         * @param  {[type]} item [遍历数据项]
         */
        delTargetFun: function(item) {
            for (var i = 0; i < this.targetList.length; i++) {
                // 通过id进行删除
                if (this.targetList[i].id === item.id) {
                    this.targetList.splice(i, 1);
                    item.status ? this.completed-- : this.unfinished--;
                    this.all--;
                }
            }
        },
        /**
         * [editFun 编辑操作]
         * @param  {[type]} item [遍历数据项]
         */
        editFun: function(item) {
            item.isEdit ? item.isEdit = false : item.isEdit = true;
        }

    }
})