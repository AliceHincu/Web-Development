package exam.springlogin.dtos;

import exam.springlogin.domain.FileC;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilesResponse {
    List<FileC> files;
    Integer pages;

}
