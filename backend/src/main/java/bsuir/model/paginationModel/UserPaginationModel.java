package bsuir.model.paginationModel;

import bsuir.model.viewModel.UserViewModel;

import java.util.Arrays;

public class UserPaginationModel {
    private int countOfPages;
    private int numberOfPage;
    private UserViewModel userViewModels[];

    public UserPaginationModel(){}

    public UserPaginationModel(int countOfPages, int numberOfPage, UserViewModel[] userViewModels) {
        this.countOfPages = countOfPages;
        this.numberOfPage = numberOfPage;
        this.userViewModels = userViewModels;
    }

    @Override
    public String toString() {
        return "UserPaginationModel{" +
                "countOfPages=" + countOfPages +
                ", numberOfPage=" + numberOfPage +
                ", userViewModels=" + Arrays.toString(userViewModels) +
                '}';
    }

    public int getCountOfPages() {
        return countOfPages;
    }

    public void setCountOfPages(int countOfPages) {
        this.countOfPages = countOfPages;
    }

    public int getNumberOfPage() {
        return numberOfPage;
    }

    public void setNumberOfPage(int numberOfPage) {
        this.numberOfPage = numberOfPage;
    }

    public UserViewModel[] getUserViewModels() {
        return userViewModels;
    }

    public void setUserViewModels(UserViewModel[] userViewModels) {
        this.userViewModels = userViewModels;
    }
}
