import { mapProjectFromApiToVm } from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

describe('./pods/project/project.mapper', () => {
  it('should return empty project when feeding null value', () => {
    // Arrange
    const project = null;

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return empty project when feeding undefined value', () => {
    // Arrange
    const project = undefined;

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return expected result feeding empty employee list', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test id',
      name: 'test name',
      externalId: 'test external id',
      comments: 'test comments',
      isActive: true,
      employees: [],
    };

    const expectedResult: viewModel.Project = {
      id: 'test id',
      name: 'test name',
      externalId: 'test external id',
      comments: 'test comments',
      isActive: true,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return expected result feeding correct values', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test id',
      name: 'test name',
      externalId: 'test external id',
      comments: 'test comments',
      isActive: true,
      employees: [
        {
          id: 'employee id 1',
          employeeName: 'John Doe',
          isAssigned: true,
        },
        {
          id: 'employee id 2',
          employeeName: 'Jane Smith',
          isAssigned: false,
        },
      ],
    };

    const expectedResult: viewModel.Project = {
      id: 'test id',
      name: 'test name',
      externalId: 'test external id',
      comments: 'test comments',
      isActive: true,
      employees: [
        {
          id: 'employee id 1',
          employeeName: 'John Doe',
          isAssigned: true,
        },
        {
          id: 'employee id 2',
          employeeName: 'Jane Smith',
          isAssigned: false,
        },
      ],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return expected result with optional fields undefined', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test id',
      name: 'test name',
      isActive: false,
      employees: [
        {
          id: 'employee id 1',
          employeeName: 'John Doe',
        },
      ],
    };

    const expectedResult: viewModel.Project = {
      id: 'test id',
      name: 'test name',
      externalId: undefined,
      comments: undefined,
      isActive: false,
      employees: [
        {
          id: 'employee id 1',
          employeeName: 'John Doe',
          isAssigned: undefined,
        },
      ],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
